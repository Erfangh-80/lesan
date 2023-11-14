import {
  Db,
  Document,
  IModel,
  IRelationsFileds,
  ObjectId,
  WithId,
} from "../../mod.ts";
import { TInsertRelations } from "../insert/insertOne.ts";
import { generateRemoveRelatedRelationFilter } from "./generateRemoveRelationRelationFilter.ts";

export const processRemoveRelatedRelations = async <
  TR extends IRelationsFileds,
>(
  {
    db,
    relations,
    foundedSchema,
    rel,
    collection,
    foundedDocPureProjection,
    prevRelationDoc,
    removeDoc,
    relDocForUpdate,
  }: {
    db: Db;
    relations: TInsertRelations<TR>;
    foundedSchema: IModel;
    rel: string;
    collection: string;
    foundedDocPureProjection: Record<string, any>;
    foundedDoc: WithId<Document> | null;
    prevRelationDoc: Record<string, any>;
    removeDoc: Record<string, any>;
    relDocForUpdate: ObjectId;
  },
) => {
  for (
    const relatedRel in foundedSchema.relations[rel]
      .relatedRelations
  ) {
    const relatedRelation =
      foundedSchema.relations[rel].relatedRelations[relatedRel];

    if (
      relations[rel]?.relatedRelations &&
      relations[rel]?.relatedRelations![relatedRel]
    ) {
      const updateFilterForRemoveRelatedRelation =
        await generateRemoveRelatedRelationFilter({
          db,
          relatedRelation,
          removeDoc,
          relatedRel,
          mainSchemaName: collection,
          mainSchemaRelationName: rel,
          relatedRelSchemaName: foundedSchema.relations[rel].schemaName,
          prevRelationDoc,
          pureMainProjection: foundedDocPureProjection,
        });

      if (updateFilterForRemoveRelatedRelation.length > 0) {
        const updatedRel = await db.collection(
          foundedSchema.relations[rel].schemaName,
        ).updateOne(
          {
            _id: relDocForUpdate,
          },
          updateFilterForRemoveRelatedRelation,
        );

        // console.log woth no truncate
        // await Deno.stdout.write(
        //   new TextEncoder().encode(
        //     `inside if with this relation: => ${
        //       JSON.stringify(relations, null, 2)
        //     }\n relationName: => ${rel}\n relatedRelSchemaName: => ${
        //       foundedSchema.relations[rel].schemaName
        //     }\n updateFileterForRemove: => ${
        //       JSON.stringify(updatedRel, null, 2)
        //     } \n with this updated doc: => ${
        //       JSON.stringify(foundedDoc[rel], null, 2)
        //     } \n with this update aggregation: => ${
        //       JSON.stringify(
        //         updateFilterForRemoveRelatedRelation,
        //         null,
        //         2,
        //       )
        //     }
        //   \n`,
        //   ),
        // );
        return updatedRel;
      }
    }
  }
};

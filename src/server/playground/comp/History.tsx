/** @jsx h */
import { RefCallback, RefObject, h } from "https://esm.sh/preact@10.5.15";
import {
  Ref,
  useEffect,
  useRef,
  useState,
} from "https://esm.sh/preact@10.5.15/hooks";
import { JSONViewer } from "./JSONVeiwer.tsx";
import { useLesan } from "./ManagedLesanContext.tsx";
import Dustbin from "./Dustbin.tsx";

export function History({
  setFormFromHistory,
}: // ,localHistory
{
  setFormFromHistory: (form: any) => void;
  // localHistory:any
}) {
  const { history, setHistory } = useLesan();
  const [show, setShow] = useState("");

  return (
    <div className="history modal-content">
      {history && history?.length > 0 ? (
        <div className="">
          <br />
          {history.map((hi) => (
            <div className="history-detail" id={hi.id}>
              <section className="history-re">
                <span className="history-re-title">REQUEST</span>
                <div className="history-re-detail">
                  <div className="history-re-detail-title">
                    <div>
                      {" "}
                      <JSONViewer
                        jsonData={(hi.request.body as any).wants.model}
                      />
                    </div>
                    <span>|</span>
                    <div>
                      <JSONViewer
                        jsonData={(hi.request.body as any).wants.act}
                      />
                    </div>
                  </div>
                  <div className="history-re-detail-date">{hi.reqTime}</div>
                  {show === hi.id ? (
                    <button
                      onClick={() => setShow("")}
                      className="history-re-detail-button"
                    >
                      Hide
                      <span className="history-re-detail-button-icon">
                        &#8211;
                      </span>
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setShow(hi.id);
                        document.getElementById(hi.id)?.scrollIntoView();
                      }}
                      className="history-re-detail-button"
                    >
                      Show{" "}
                      <span className="history-re-detail-button-icon">
                        &#43;
                      </span>
                    </button>
                  )}
                </div>
                <div
                  className="history-re-detail-complete"
                  data-show={show === hi.id}
                >
                  {" "}
                  <JSONViewer jsonData={hi.request} />
                </div>
              </section>
              <section className="history-re history-response">
                <span className="history-re-title">RESPONSE</span>
                <div className="history-re-detail">
                  <div className="history-re-detail-title">
                    <div className="history-re-response-title">
                      {" "}
                      <span className="history-re-response-title-status">
                        success:
                      </span>
                      <div className="history-re-response-info">
                        <JSONViewer jsonData={hi.response.success} />
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setFormFromHistory(hi.request)}
                    className="history-re-detail-button"
                  >
                    Use{" "}
                    <span className="history-re-detail-button-icon">
                      &#10140;{" "}
                    </span>
                  </button>
                </div>
                <div
                  className="history-re-detail-complete"
                  data-show={show === hi.id}
                >
                  {" "}
                  <JSONViewer jsonData={hi.response} />
                </div>
              </section>
            </div>
          ))}
        </div>
      ) : (
        <span className="no-history">"There is no history to display"</span>
      )}
      {history && history.length > 0 ? (
        <div className="clear-history">
          <button
            className="btn clear-history-button tooltip"
            onClick={() => {
              if (confirm("Clear All History?") == true) {
                localStorage.removeItem("localHistory");
                setHistory("");
              }
            }}
          >
            {" "}
            <Dustbin />
            <span className="tooltip-text">Clear History</span>
          </button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

import { useParams, Link } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import JSONData from "./data.json";
import { useSelector, useDispatch } from "react-redux";
import { changeGlobleItems, sendMails } from "../../redux/globleSlice";
import Header from "../../components/Header/Header";
const Tables = () => {
  const dispatch = useDispatch();
  const tableID = useParams().id;
  const [opt, setOpt] = useState("cocktails");
  const [total, setTotal] = useState("0.00");
  const { globleItems, mailStorge } = useSelector((state) => state.globle);
  const thisTable = mailStorge.filter((f) => f.tableNr === tableID);
  const thisTempory = globleItems.filter((f) => f.tableNr === tableID);
  const handleRemove = (id) =>
    dispatch(
      changeGlobleItems(globleItems.filter(({ itemID }) => itemID !== id))
    );

  const calculateTotal = useCallback(() => {
    const sum = globleItems
      .filter((gi) => gi.tableNr === tableID)
      .reduce((acc, item) => acc + parseFloat(item.totalPrice), 0);
    setTotal(sum ? sum.toFixed(2) : "0.00");
    // eslint-disable-next-line
  }, [globleItems, tableID, dispatch]);
  const insertItems = useCallback(
    (id) => {
      const filtered = JSONData[opt].find((v) => v.id === id);
      if (
        filtered &&
        !globleItems
          .filter((gi) => gi.tableNr === tableID)
          .some((item) => item.id === id)
      ) {
        const newItem = {
          ...filtered,
          quantity: 1,
          totalPrice: filtered.price,
          tableNr: tableID,
          itemID: `T${tableID}-${filtered.id}`,
        };
        dispatch(changeGlobleItems([...globleItems, newItem]));
      }

      // eslint-disable-next-line
    },
    [opt, globleItems, tableID, dispatch]
  );
  const updateItemQuantity = (id, delta) => {
    dispatch(
      changeGlobleItems(
        globleItems.map((item) =>
          item.itemID === id
            ? {
                ...item,
                quantity: item.quantity + delta,
                totalPrice: ((item.quantity + delta) * item.price).toFixed(2),
              }
            : item
        )
      )
    );
  };
  useEffect(() => {
    calculateTotal();
  }, [globleItems, calculateTotal, dispatch]);
  const closeOrder = () => {
    const orderItems = globleItems.filter((item) => item.tableNr === tableID);
    const orderTotal = mailStorge.filter(
      (item) => item.tableNr === tableID
    ).length;
    const orderId = `Order-${orderTotal + 1}-Table-${tableID}`;
    const orderData = {
      orderId,
      orders: orderItems,
      tableNr: tableID,
      closed: true,
      sum: total,
    };
    dispatch(sendMails([...mailStorge, orderData]));
    dispatch(
      changeGlobleItems(
        globleItems.filter(({ tableNr }) => tableNr !== tableID)
      )
    );
  };
  const migrateOrder = async () => {
    const { REACT_APP_SERVER_URL } = process.env;
    try {
      const response = await fetch(`${REACT_APP_SERVER_URL}/table/mailo`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(thisTable),
      });
      dispatch(
        sendMails(mailStorge.filter(({ tableNr }) => tableNr !== tableID))
      );
      return response;
    } catch (error) {
      console.error("Error closing order:", error);
    }
  };
  return (
    <>
      <Header
        children={
          <h1 className="flex text-3xl">
            Table <span>{tableID}</span>
          </h1>
        }
      />
      <main className="main">
        <section>
          <form>
            <div>
              <label htmlFor="opt">Select category :</label>
              <select
                value={opt}
                onChange={(event) => setOpt(event.target.value)}
              >
                <option value="cocktails">cocktails</option>
                <option value="sandwiches">sandwiches</option>
                <option value="brunch">brunch</option>
                <option value="sweets">sweets</option>
                <option value="hotdrinks">hot-drinks</option>
                <option value="longdrinks">long-drinks</option>
                <option value="colddrinks">cold-drinks</option>
                <option value="shots">shots</option>
                <option value="wine">wine</option>
              </select>
            </div>
            <div id="items">
              <div className="sub-items">
                {JSONData[opt].map(({ id, name }) => (
                  <button
                    type="button"
                    id={`Table${tableID}${id}`}
                    key={`Table${tableID}${id}`}
                    onClick={() => insertItems(id)}
                  >
                    {name}
                  </button>
                ))}
              </div>
            </div>
          </form>
          <table id="table">
            <caption>
              <div>
                <p>
                  Total: <strong>{total}</strong> €
                </p>
                {thisTempory.length > 0 && (
                  <button onClick={closeOrder}>Close Order</button>
                )}
              </div>
            </caption>
            <thead>
              <tr>
                <th scope="col">Order</th>
                <th scope="col">Quantity</th>
                <th scope="col">Price</th>
              </tr>
            </thead>
            <tbody>
              {globleItems
                .filter((gi) => gi.tableNr === tableID)
                .map((item) => (
                  <tr key={item.id}>
                    <th>
                      <div className="flex flex-row items-center  w-full _fImage">
                        <button
                          type="button"
                          onClick={() => handleRemove(`T${tableID}-${item.id}`)}
                          className="hover:scale-125"
                        >
                          <svg
                            height="28px"
                            width="28px"
                            viewBox="0 0 1024 1024"
                            className="icon"
                            version="1.1"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="#000000"
                          >
                            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                            <g
                              id="SVGRepo_tracerCarrier"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            ></g>
                            <g id="SVGRepo_iconCarrier">
                              <path
                                d="M667.8 362.1H304V830c0 28.2 23 51 51.3 51h312.4c28.4 0 51.4-22.8 51.4-51V362.2h-51.3z"
                                fill="#CCCCCC"
                              ></path>
                              <path
                                d="M750.3 295.2c0-8.9-7.6-16.1-17-16.1H289.9c-9.4 0-17 7.2-17 16.1v50.9c0 8.9 7.6 16.1 17 16.1h443.4c9.4 0 17-7.2 17-16.1v-50.9z"
                                fill="#CCCCCC"
                              ></path>
                              <path
                                d="M733.3 258.3H626.6V196c0-11.5-9.3-20.8-20.8-20.8H419.1c-11.5 0-20.8 9.3-20.8 20.8v62.3H289.9c-20.8 0-37.7 16.5-37.7 36.8V346c0 18.1 13.5 33.1 31.1 36.2V830c0 39.6 32.3 71.8 72.1 71.8h312.4c39.8 0 72.1-32.2 72.1-71.8V382.2c17.7-3.1 31.1-18.1 31.1-36.2v-50.9c0.1-20.2-16.9-36.8-37.7-36.8z m-293.5-41.5h145.3v41.5H439.8v-41.5z m-146.2 83.1H729.5v41.5H293.6v-41.5z m404.8 530.2c0 16.7-13.7 30.3-30.6 30.3H355.4c-16.9 0-30.6-13.6-30.6-30.3V382.9h373.6v447.2z"
                                fill="#211F1E"
                              ></path>
                              <path
                                d="M511.6 798.9c11.5 0 20.8-9.3 20.8-20.8V466.8c0-11.5-9.3-20.8-20.8-20.8s-20.8 9.3-20.8 20.8v311.4c0 11.4 9.3 20.7 20.8 20.7zM407.8 798.9c11.5 0 20.8-9.3 20.8-20.8V466.8c0-11.5-9.3-20.8-20.8-20.8s-20.8 9.3-20.8 20.8v311.4c0.1 11.4 9.4 20.7 20.8 20.7zM615.4 799.6c11.5 0 20.8-9.3 20.8-20.8V467.4c0-11.5-9.3-20.8-20.8-20.8s-20.8 9.3-20.8 20.8v311.4c0 11.5 9.3 20.8 20.8 20.8z"
                                fill="#211F1E"
                              ></path>
                            </g>
                          </svg>
                        </button>
                        <span>{item.name}</span>
                      </div>
                    </th>
                    <th>
                      <div className="flex flex-row items-center justify-center gap-1">
                        <button
                          className="_in_decrement"
                          onClick={() =>
                            updateItemQuantity(`T${tableID}-${item.id}`, -1)
                          }
                          disabled={item.quantity === 1}
                        >
                          -
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          className="_in_decrement"
                          onClick={() =>
                            updateItemQuantity(`T${tableID}-${item.id}`, 1)
                          }
                        >
                          +
                        </button>
                      </div>
                    </th>
                    <th>{item.totalPrice}</th>
                  </tr>
                ))}
            </tbody>
          </table>
        </section>
        <section>
          <aside>
            <div
              className="flex flex-col"
              style={{
                borderBottom:
                  thisTable.length > 0 ? "5px double #475569a6" : "none",
              }}
            >
              {thisTable.map((o) => {
                return (
                  <Link
                    className="p-1 px-2 flex justify-between hover:bg-sky-700"
                    to={`/Order/${o.orderId}`}
                    key={o.orderId}
                  >
                    <p>{o.orderId}</p>
                    <p>
                      <b>{o.sum} €</b>
                    </p>
                  </Link>
                );
              })}
            </div>
            {thisTable.length > 0 && (
              <button className="_sendBTN" type="submit" onClick={migrateOrder}>
                Send Mail
              </button>
            )}
          </aside>
        </section>
      </main>
    </>
  );
};
export default Tables;

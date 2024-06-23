import { useParams, Link } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import JSONData from "./data.json";
import removeIcon from "./remove.svg";
import { useSelector, useDispatch } from "react-redux";
import { changeGlobleItems, sendMails } from "../../redux/globleSlice";
const Tables = () => {
  const dispatch = useDispatch();
  const tableID = useParams().id;
  const [opt, setOpt] = useState("cocktails");
  const [total, setTotal] = useState("0.00");
  const { globleItems, mailStorge } = useSelector(state => state.globle);
  const thisTable = mailStorge.filter(f => f.tableNr === tableID);
  const thisTempory = globleItems.filter(f => f.tableNr === tableID);
  const handleRemove = id => dispatch(changeGlobleItems(globleItems.filter(({ itemID }) => itemID !== id)));

  const calculateTotal = useCallback(() => {
    const sum = globleItems
      .filter((gi) => gi.tableNr === tableID)
      .reduce((acc, item) => acc + parseFloat(item.totalPrice), 0);
    setTotal(sum ? sum.toFixed(2) : "0.00");
    // eslint-disable-next-line
  }, [globleItems, tableID ,dispatch]);
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
          itemID: `T${tableID}-${filtered.id}`
        };
        dispatch(changeGlobleItems([...globleItems, newItem]));
      }

      // eslint-disable-next-line
    },
    [opt, globleItems,tableID, dispatch]
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
  }, [globleItems, calculateTotal ,dispatch]);
  const closeOrder = () => {
    const orderItems = globleItems.filter(item => item.tableNr === tableID);
    const orderTotal = mailStorge.filter(item => item.tableNr === tableID).length;
    const orderId = `Order-${orderTotal + 1}-Table-${tableID}`;
    const orderData = {
      orderId,
      orders: orderItems,
      tableNr: tableID,
      closed: true,
      sum: total
    };
    dispatch(sendMails([...mailStorge, orderData]))
    dispatch(changeGlobleItems(globleItems.filter(({ tableNr }) => tableNr !== tableID)));
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
      dispatch(sendMails(mailStorge.filter(({tableNr})=> tableNr !== tableID)))
      return response;
    } catch (error) {
      console.error('Error closing order:', error);
    }
  }
  return (
    <>
      <header>
        <Link to="/">
          <h1 className="text-3xl">Table {tableID}</h1>
        </Link>
      </header>
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
               {thisTempory.length > 0 && <button onClick={closeOrder}>Close Order</button>}
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
                      <div className="flex flex-row w-full _fImage">
                        <button
                          type="button"
                          onClick={() => handleRemove(`T${tableID}-${item.id}`)}
                        >
                          <img
                            className="hover:scale-125"
                            width={30}
                            height={27}
                            alt="Remove-this-item"
                            src={removeIcon}
                          />
                        </button>

                        <span>{item.name}</span>
                      </div>
                    </th>
                    <th>
                      <div className="flex flex-row items-center justify-center gap-1">
                        <button
                          className="_in_decrement"
                          onClick={() => updateItemQuantity(`T${tableID}-${item.id}`, -1)}
                          disabled={item.quantity === 1}
                        >
                          -
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          className="_in_decrement"
                          onClick={() => updateItemQuantity(`T${tableID}-${item.id}`, 1)}
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
            <div className="flex flex-col" style={{borderBottom:thisTable.length > 0 ? '5px double #475569a6':'none'}}>
            {thisTable.map((o) => {
              return (
                <Link className="p-1 px-2 flex justify-between hover:bg-sky-700" to={`/Order/${o.orderId}`} key={o.orderId}>
                  <p>{o.orderId}</p>
                  <p><b>{o.sum} €</b></p>
                </Link>
              )
            })}
            </div>
            {thisTable.length > 0 && <button className="_sendBTN" type="submit" onClick={migrateOrder}>Send Mail</button>}
          </aside>
        </section>
      </main>
    </>
  );
};
export default Tables;

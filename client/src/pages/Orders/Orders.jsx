import { useParams, Link } from "react-router-dom";
import { useSelector} from "react-redux";
import Header from "../../components/Header/Header";
function Orders() {
  const { id } = useParams();
  const { mailStorge } = useSelector((state) => state.globle);
  const goBack = () => {
    return window.history.go(-1);
  };
  return (
    <>
      <Header children={<h1 className="text-2xl">{id}</h1>}/>
      <div className="mt-10">
        {mailStorge
          .filter((f) => f.orderId === id)
          .map(({ orderId, sum, orders }) => {
            return (
              <table key={orderId}>
                <caption >
                  <div>
                    <p>
                      Total: <strong>{sum}</strong> €
                    </p>
                    <button onClick={goBack}>Back To Table</button>
                  </div>
                </caption>
                <thead>
                  <tr>
                    <th scope="col">Item</th>
                    <th scope="col">Price</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">TotalPrice</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map(({
                      name,
                      price,
                      quantity,
                      totalPrice,
                      itemID,
                    }) => {
                      return (
                        <tr key={itemID}>
                          <th>{name}</th>
                          <th scope="col">{price}</th>
                          <th>{quantity}</th>
                          <th>{totalPrice}</th>
                        </tr>
                      )})}
                </tbody>
              </table>
            );
          })}
      </div>
    </>
  )}
export default Orders;

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function HomePage() {
  const [tody] = useState(
    new Intl.DateTimeFormat("de", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(new Date())
  );
  const [tables, setTables] = useState(
    Array.from({ length: 8 }, (_, i) => ({ table: i + 1, free: false }))
  );
  const { globleItems } = useSelector((state) => state.globle);

  const reserviert = () => {
    const reservedTables = globleItems.filter(({ tableNr }) => {
      const index = tables.findIndex(({ table }) => table == tableNr);
      if (index !== -1) {
        tables[index]["free"] = true;
        return true;
      }
      return false;
    });
    setTables([...tables]);
    return reservedTables;
  };
  useEffect(() => {
    reserviert();
  }, []);
  return (
    <div>
      <header>
        <h1 className="text-3xl">CalTables</h1>
        <p>{tody}</p>
      </header>
      <main>
        <section>
          <div id="tables">
            {tables.map((a) => (
              <Link
                className={a.free === true ? "bg-green-700" : "_tableAnchor"}
                key={`table${a.table}`}
                to={`Table/${a.table}`}
              >
                Table {a.table}
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default HomePage;

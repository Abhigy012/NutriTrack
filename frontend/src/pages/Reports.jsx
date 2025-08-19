import { useEffect, useRef, useState } from "react";
import Loading from "../components/Loading";
const url = import.meta.env.VITE_API_URL;

export default function Reports() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState(false);
  const fileRef = useRef();

  const refresh = async () => {
    try {
      const res = await fetch(`${url}/report/list`, { credentials: "include" });
      const data = await res.json();
      setItems(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error("Failed to fetch report list:", e);
    }
  };

  useEffect(() => {
    refresh();
  }, []);

  const upload = async (e) => {
    e.preventDefault();
    const file = fileRef.current?.files?.[0];
    if (!file) return;
    setLoading(true);
    const form = new FormData();
    form.append("file", file);
    try {
      const res = await fetch(`${url}/report/upload`, {
        method: "POST",
        credentials: "include",
        body: form,
      });
      if (res.ok) {
        if (fileRef.current) fileRef.current.value = "";
        await refresh();
      }
    } catch (error) {
      console.error("Failed to upload report:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="p-3 sm:p-4 w-full">
      <div className="max-w-3xl mx-auto bg-white p-3 sm:p-4 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-3">Upload Report (PDF)</h2>
        <form
          onSubmit={upload}
          className="flex flex-col sm:flex-row gap-2 items-start sm:items-center"
        >
          <input
            type="file"
            accept="application/pdf"
            ref={fileRef}
            onChange={(e) => setSelected(!!e.target.files?.length)}
          />
          <button
            className={`px-3 py-1 rounded cursor-pointer ${
              selected && !loading
                ? "bg-black text-white"
                : "bg-gray-300 text-gray-600 cursor-not-allowed"
            }`}
            type="submit"
            disabled={!selected || loading}
          >
            Upload now
          </button>
        </form>
      </div>
      <div className="mt-4 grid gap-3 max-w-3xl mx-auto">
        {items.map((r) => (
          <div key={r._id} className="bg-white p-3 rounded border">
            <div className="font-semibold">
              {new Date(r.createdAt).toLocaleString()}
            </div>
            {r.comment ? (
              <div className="text-sm mb-1">
                <span className="font-semibold">Comment:</span> {r.comment}
              </div>
            ) : null}
            <div className="text-sm">
              Avoid: {(r.avoidList || []).join(", ")}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

import List from "./List";

export default function Lists({ lists }) {
  return (
    <>
      {lists?.length === 0 ? (
        <div className="flex flex-col items-center mt-28">
          <p>Nie posiadasz żadnej listy</p>
        </div>
      ) : (
        <ul className="flex flex-col gap-y-3">
          {lists?.map((list) => (
            <List list={list} key={list.id} />
          ))}
        </ul>
      )}
    </>
  );
}

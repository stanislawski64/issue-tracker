function Board() {
  return (
    <main className="MainContent Board">
      <div className="CardsContainer">
        <div className="Card">
          <div className="CardTitleDiv">to do</div>
          <div className="Issue">Yo it's an issue</div>
          <div className="Issue">Yo it's an issue</div>
          <div className="Issue">Yo it's an issue</div>
          <div className="Issue">Yo it's an issue</div>
        </div>
        <div className="Card">
          <div className="CardTitleDiv">in progress</div>
        </div>
        <div className="Card">
          <div className="CardTitleDiv">in review</div>
        </div>
        <div className="Card">
          <div className="CardTitleDiv">done</div>
        </div>
      </div>
    </main>
  );
}

export default Board;

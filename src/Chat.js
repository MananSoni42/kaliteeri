function Chat() {
    return (
        <div>
            <div className="row fs-2 bg-secondary text-light">
                <div className="col-12 text-center"> Chat </div>
            </div>
            <div className="row">
                <div className="col-12 fs-6 border border-dark">Chats</div>
            </div>
            <div className="row">
                <div className="col-3"></div>
                <div className="col-6 p-1">
                    <button className="btn btn-sm fs-4 btn-dark text-light"> Send </button>
                </div>
                <div className="col-3"></div>
            </div>
        </div>
    );
}

export default Chat;
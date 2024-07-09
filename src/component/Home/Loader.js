

export default function Loader( {loading}) {
    return (
        // <!-- LOADER -->
        loading ?
        <div className="loader-warpper" id="loader">
            <div className="loader"></div>
        </div>
        : <></>
    );
}
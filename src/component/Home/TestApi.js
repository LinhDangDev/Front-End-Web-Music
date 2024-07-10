import React from 'react';
import SongService from '../../services/SongService';
class TestApi extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            song: [],
            name: 'Pino Dat'
        }
    }
    componentDidMount() {
        SongService.getAll().then((res) => {
            this.setState({ song: res.result });
        });
    }
    render() {

        return (
            <>
                <h1>Hello, Pino Dat
                    {this.state.song.length > 0 ? (
                        <h2>{this.state.song[0].songTitle}</h2>
                    ) : (
                        <p>Đang tải dữ liệu...</p>
                    )}
                    {/* {this.state.student[0].studentName} */}
                </h1>
            </>
        )
    }

}
export default TestApi;
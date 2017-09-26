/**
 * Created by dllo on 17/9/23.
 */

import React, {Component} from 'react'

// class ComingSoon extends Component {
//
//     state = {
//         data: []
//     }
//
//     componentDidMount() {
//         this.ajax('/api/film/coming-soon?page=1&count=7')
//     }
//
//     ajax(url) {
//         fetch(url)
//             .then(response => response.json())
//             .then(response => {
//                 this.setState({
//                     data: response.data.films
//                 }, () => {
//                     console.log(this.state.data)
//                 })
//             })
//     }
//
//     time = (time) => {
//         let months = new Date(parseInt(time)).toLocaleString().substr(5, 2).replace('/', '')
//         let days = new Date(parseInt(time)).toLocaleString().substr(7, 2)
//
//         return `${months}月${days}日上映`
//     }
//     week = (time) => {
//         let weeks = new Date(parseInt(time)).getDay()
//         const chineseArr = ['一', '二', '三', '四', '五', '六', '日']
//         return `星期${chineseArr[weeks - 1]}`
//     }
//
//     render() {
//         let comingArr = this.state.data.map((item, index) => {
//             return (
//                 <div key={index.toString()} className='film-main'>
//                     <div className="film-one">
//                         <div className="film-img">
//                             <img src={item.poster.thumbnail}/>
//                         </div>
//                         <div className="film-message">
//                             <div className="message-header">
//                                 <div className="message-movie-name">
//                                     {item.name}
//                                 </div>
//                             </div>
//                             <p className="message-content">{item.intro}</p>
//                             <div className="message-coming">
//                                 {this.time(item.premiereAt)}
//                                 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
//                                 {this.week(item.premiereAt)}
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//
//             )
//         })
//
//
//         return (
//             <div>
//                 {comingArr}
//             </div>
//         )
//     }
// }


/* eslint no-dupe-keys: 0, no-mixed-operators: 0 */
import { ListView } from 'antd-mobile/lib';


function MyBody(props) {
    return (
        <div className="am-list-body my-body">
            <span style={{ display: 'none' }}>you can custom body wrap element</span>
            {props.children}
        </div>
    );
}

const data = [
    {
        img: 'https://zos.alipayobjects.com/rmsportal/dKbkpPXKfvZzWCM.png',
        title: 'Meet hotel',
        des: '不是所有的兼职汪都需要风吹日晒',
    },
    {
        img: 'https://zos.alipayobjects.com/rmsportal/XmwCzSeJiqpkuMB.png',
        title: 'McDonald\'s invites you',
        des: '不是所有的兼职汪都需要风吹日晒',
    },
    {
        img: 'https://zos.alipayobjects.com/rmsportal/hfVtzEhPzTUewPm.png',
        title: 'Eat the week',
        des: '不是所有的兼职汪都需要风吹日晒',
    },
];
let index = data.length - 1;

const NUM_SECTIONS = 5;
const NUM_ROWS_PER_SECTION = 5;
let pageIndex = 0;

class ComingSoon extends React.Component {
    constructor(props) {
        super(props);
        const getSectionData = (dataBlob, sectionID) => dataBlob[sectionID];
        const getRowData = (dataBlob, sectionID, rowID) => dataBlob[rowID];

        const dataSource = new ListView.DataSource({
            getRowData,
            getSectionHeaderData: getSectionData,
            rowHasChanged: (row1, row2) => row1 !== row2,
            sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
        });

        this.dataBlob = {};
        this.sectionIDs = [];
        this.rowIDs = [];
        this.genData = (pIndex = 0) => {
            for (let i = 0; i < NUM_SECTIONS; i++) {
                const ii = (pIndex * NUM_SECTIONS) + i;
                const sectionName = `Section ${ii}`;
                this.sectionIDs.push(sectionName);
                this.dataBlob[sectionName] = sectionName;
                this.rowIDs[ii] = [];

                for (let jj = 0; jj < NUM_ROWS_PER_SECTION; jj++) {
                    const rowName = `S${ii}, R${jj}`;
                    this.rowIDs[ii].push(rowName);
                    this.dataBlob[rowName] = rowName;
                }
            }
            // new object ref
            this.sectionIDs = [].concat(this.sectionIDs);
            this.rowIDs = [].concat(this.rowIDs);
        };

        this.state = {
            dataSource: dataSource.cloneWithRowsAndSections(this.dataBlob, this.sectionIDs, this.rowIDs),
            isLoading: true,
        };
    }

    componentDidMount() {
        // you can scroll to the specified position
        // setTimeout(() => this.refs.lv.refs.listview.scrollTo(0, 120), 800); // also work
        // setTimeout(() => this.refs.lv.scrollTo(0, 120), 800); // recommend usage

        // simulate initial Ajax
        setTimeout(() => {
            this.genData();
            this.setState({
                dataSource: this.state.dataSource.cloneWithRowsAndSections(this.dataBlob, this.sectionIDs, this.rowIDs),
                isLoading: false,
            });
        }, 600);
    }

    // If you use redux, the data maybe at props, you need use `componentWillReceiveProps`
    // componentWillReceiveProps(nextProps) {
    //   if (nextProps.dataSource !== this.props.dataSource) {
    //     this.setState({
    //       dataSource: this.state.dataSource.cloneWithRowsAndSections(nextProps.dataSource),
    //     });
    //   }
    // }

    onEndReached = (event) => {
        // load new data
        // hasMore: from backend data, indicates whether it is the last page, here is false
        if (this.state.isLoading && !this.state.hasMore) {
            return;
        }
        console.log('reach end', event);
        this.setState({ isLoading: true });
        setTimeout(() => {
            this.genData(++pageIndex);
            this.setState({
                dataSource: this.state.dataSource.cloneWithRowsAndSections(this.dataBlob, this.sectionIDs, this.rowIDs),
                isLoading: false,
            });
        }, 1000);
    }

    render() {
        const separator = (sectionID, rowID) => (
            <div key={`${sectionID}-${rowID}`}
                 style={{
                     backgroundColor: '#F5F5F9',
                     height: 8,
                     borderTop: '1px solid #ECECED',
                     borderBottom: '1px solid #ECECED',
                 }}
            />
        );
        const row = (rowData, sectionID, rowID) => {
            if (index < 0) {
                index = data.length - 1;
            }
            const obj = data[index--];
            return (
                <div key={rowID} className="row">
                    <div className="row-title">{obj.title}</div>
                    <div style={{ display: '-webkit-box', display: 'flex', padding: '0.3rem 0' }}>
                        <img style={{ height: '1.28rem', marginRight: '0.3rem' }} src={obj.img} alt="icon" />
                        <div className="row-text">
                            <div style={{ marginBottom: '0.16rem', fontWeight: 'bold' }}>{obj.des}</div>
                            <div><span style={{ fontSize: '0.6rem', color: '#FF6E27' }}>35</span>¥</div>
                        </div>
                    </div>
                </div>
            );
        };

        return (<div style={{ margin: '0 auto', width: '96%' }}>
            <ListView ref="lv"
                      dataSource={this.state.dataSource}
                      renderHeader={() => <span>header</span>}
                      renderFooter={() => (<div style={{ padding: 30, textAlign: 'center' }}>
                          {this.state.isLoading ? 'Loading...' : 'Loaded'}
                      </div>)}
                      renderSectionHeader={sectionData => (
                          <div>{`Task ${sectionData.split(' ')[1]}`}</div>
                      )}
                      renderBodyComponent={() => <MyBody />}
                      renderRow={row}
                      renderSeparator={separator}
                      className="fortest"
                      style={{
                          height: document.documentElement.clientHeight * 3 / 4,
                          overflow: 'auto',
                          border: '1px solid #ddd',
                          margin: '0.1rem 0',
                      }}
                      pageSize={4}
                      onScroll={() => { console.log('scroll'); }}
                      scrollRenderAheadDistance={500}
                      scrollEventThrottle={200}
                      onEndReached={this.onEndReached}
                      onEndReachedThreshold={10}
            />
        </div>);
    }
}

export default ComingSoon

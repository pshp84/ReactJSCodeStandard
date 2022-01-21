import React, { useEffect, useState } from 'react';
import { default as ReactSelect } from "react-select";
import { Table } from 'antd';
import moment from 'moment';

import { getUsersToken, getTagsList, getContactList } from '../../services/SeasonalGamesService';

const SeasonalGamesComponent = () => {
    const [seasonalGamesData, setSeasonalGamesData] = useState([]);
    const [includesTagArr, setIncludeTagArr] = useState([]);
    const [excludeTagArr, setExcludeTagArr] = useState([])
    const [contactRequestData, setContactRequestData] = useState({
        maxMessagesRecv: 0,
        maxMessagesSent: 0,
        minMessagesRecv: 0,
        minMessagesSent: 0,
        notTags: [],
        q: '',
        tags: []
    })

    useEffect(() => {
        getAccessToken();
    }, [])

    const getAccessToken = () => {
        const data = {
            refreshToken: "059c420e-7424-431f-b23b-af0ecabfe7b8",
            teamId: "a001994b-918b-4939-8518-3377732e4e88"
        }
        getUsersToken(JSON.stringify(data)).then(function (response) {
            if (response) {
                localStorage.setItem("accessToken", response.data.access_token);
                getContactsData(response.data.access_token);
                getAllListTags(response.data.access_token);
            }
        }).catch(function (error) {
            console.error(error);
        });
    }

    const getContactsData = (token) => {
        let isMaxMessageSent = `&maxMessagesSent=${parseInt(contactRequestData.maxMessagesSent)}`;
        let notIsMaxMessageSent = '';
        let isMaxMessageRec = `&maxMessagesRecv=${parseInt(contactRequestData.maxMessagesRecv)}`;
        let notIsMaxMessageRec = '';
        let isMinMessageSent = `&minMessagesSent=${parseInt(contactRequestData.minMessagesSent)}`;
        let notIsMinMessageSent = '';
        let isMinMessageRec = `&minMessagesRecv=${parseInt(contactRequestData.minMessagesRecv)}`;
        let notIsMinMessageRec = '';
        let isNotTags = `&notTags=${contactRequestData.notTags}`;
        let notTagsBlank = '';
        let isTags = `&tags=${contactRequestData.tags}`;
        let tagsBlank = '';
        let isSearchQuery = `&q=${contactRequestData.q}`;
        let notIsSearchQuery = '';

        const reqURL = `contacts?returnTotalCount=true${contactRequestData.maxMessagesSent !== 0 ? isMaxMessageSent : notIsMaxMessageSent}${contactRequestData.maxMessagesRecv !== 0 ? isMaxMessageRec : notIsMaxMessageRec}${contactRequestData.minMessagesSent !== 0 ? isMinMessageSent : notIsMinMessageSent}${contactRequestData.minMessagesRecv !== 0 ? isMinMessageRec : notIsMinMessageRec}${contactRequestData.notTags.length > 0 ? isNotTags : notTagsBlank}${contactRequestData.q !== '' ? isSearchQuery : notIsSearchQuery}${contactRequestData.tags.length > 0 ? isTags : tagsBlank}`

        getContactList(reqURL, token).then(function (response) {
            setSeasonalGamesData([...response.data.contacts]);
        }).catch(function (error) {
            console.error(error);
        });
    }

    const getAllListTags = (token) => {
        getTagsList(token).then(function (response) {
            let tempArr = [];
            response.data.tags.forEach(element => {
                tempArr.push({ label: element.name, value: element.name });
            });
            setIncludeTagArr([...tempArr]);
            setExcludeTagArr([...tempArr]);
        }).catch(function (error) {
            console.error(error);
        });
    }

    const setData = (value, name) => {
        const data = { ...contactRequestData };
        data[name] = value;
        setContactRequestData({ ...data });
    }

    const handleChange = (data, type) => {
        if (data.length > 0) {
            let x = [];
            data.forEach(element => {
                x.push(element.label);
            });
            contactRequestData[type] = [...x];
            setContactRequestData({ ...contactRequestData });
        } else {
            setContactRequestData({
                maxMessagesRecv: 0,
                maxMessagesSent: 0,
                minMessagesRecv: 0,
                minMessagesSent: 0,
                notTags: [],
                q: '',
                tags: []
            });
        }
    }

    const clickOnReset = () => {
        window.location.reload()
    }

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            sorter: (a, b) => a.name.length - b.name.length,
            sortDirections: ['descend'],
            width: 100,
        },
        {
            title: 'Phone No.',
            dataIndex: 'phoneNumber',
            key: 'phoneNumber',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.phoneNumber - b.phoneNumber,
            width: 100,
        },
        {
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
            sorter: (a, b) => a.name.length - b.name.length,
            sortDirections: ['descend'],
            width: 100,
        },
        {
            title: 'CreatedAt',
            dataIndex: 'createdAt',
            key: 'createdAt',
            sorter: (a, b) => a.createdAt - b.createdAt,
            render: (object) => <span>{moment(object).format('DD/MM/YYYY hh:mm:ss')}</span>,
            width: 100,
        },
        {
            title: 'Message Sent',
            dataIndex: 'messagesSent',
            key: 'messagesSent',
            width: 100,
        },
        {
            title: 'Message Received',
            dataIndex: 'messagesReceived',
            key: 'messagesReceived',
            width: 100,
        },
        {
            title: 'Tags',
            dataIndex: 'tags',
            key: 'tags',
            render: (object) => <span>
                {object ?
                    object.map((data, i) => (
                        <span key={i}>{data.name}, &nbsp;</span>
                    ))
                    :
                    ''
                }
            </span>,
            width: 100,
        },
    ];

    return (
        <div className="content-wrapper">
            <div className="p-3"><h3>Seasonal Games</h3></div>
            <section className="content">
                <div className="card card-default">
                    <div className="card-header">
                        <h3 className="card-title">Filter</h3>
                    </div>
                    <div className="card-body">
                        <div className="row d-flex align-items-end">
                            <div className="col-6">
                                <label htmlFor="exampleFormControlInput1" className="form-label">Includes Tags:</label>
                                <ReactSelect
                                    options={includesTagArr}
                                    isMulti
                                    closeMenuOnSelect={false}
                                    hideSelectedOptions={false}
                                    onChange={(e) => handleChange(e, 'tags')}
                                    allowSelectAll={true}
                                />
                            </div>
                            <div className="col-6">
                                <label htmlFor="exampleFormControlInput1" className="form-label">Excludes Tags:</label>
                                <ReactSelect
                                    options={excludeTagArr}
                                    isMulti
                                    closeMenuOnSelect={false}
                                    hideSelectedOptions={false}
                                    onChange={(e) => handleChange(e, 'notTags')}
                                    allowSelectAll={true}
                                />
                            </div>
                        </div>
                        <div className="mt-4">
                            <label htmlFor="exampleFormControlInput1" className="form-label">Message sent:</label>
                            <div className="row">
                                <div className="col-6">
                                    <input className="form-control" type="number" placeholder="Min" min="1" onChange={(e) => setData(e.target.value, 'minMessagesSent')} />
                                </div>
                                <div className="col-6">
                                    <input className="form-control" type="number" placeholder="Max" min="1" onChange={(e) => setData(e.target.value, 'maxMessagesSent')} />
                                </div>
                            </div>
                        </div>
                        <div className="mt-4">
                            <label htmlFor="exampleFormControlInput1" className="form-label">Message received:</label>
                            <div className="row">
                                <div className="col-6">
                                    <input className="form-control" type="number" placeholder="Min" min="1" onChange={(e) => setData(e.target.value, 'minMessagesRecv')} />
                                </div>
                                <div className="col-6">
                                    <input className="form-control" type="number" placeholder="Max" min="1" onChange={(e) => setData(e.target.value, 'maxMessagesRecv')} />
                                </div>
                            </div>
                        </div>
                        <div className="mt-4 d-flex">
                            <div className="mr-4"><button type="button" className="btn btn-primary" onClick={() => getContactsData(localStorage.getItem('accessToken'))}>Filter</button></div>
                            <div><button type="button" className="btn btn-danger" onClick={clickOnReset}>Reset</button></div>
                        </div>
                    </div>
                </div>
                <br></br>
                <div className="card">
                    <div className="card-header">
                        <h3 className="card-title">Table</h3>
                    </div>
                    <div className="card-body">
                        <Table columns={columns} dataSource={seasonalGamesData} scroll={{ x: 1300 }} />
                    </div>
                </div>
            </section>
        </div>
    )
}

export default SeasonalGamesComponent

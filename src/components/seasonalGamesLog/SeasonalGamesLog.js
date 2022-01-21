import React, { useState } from 'react';
import { Table } from 'antd';

const SeasonalGamesLog = () => {
    const [seasonalPlayerLog, setSeasonalPlayerLog] = useState([]);

    const columns = [
        {
            title: 'First Name',
            dataIndex: 'firstName',
            key: 'firstName',
            width: 50,
        },
        {
            title: 'Last Name',
            dataIndex: 'lastName',
            key: 'lastName',
            width: 50,
        },
        {
            title: 'Email Id',
            dataIndex: 'email',
            key: 'email',
            width: 50,
        },
        {
            title: 'Password',
            dataIndex: 'password',
            key: 'password',
            width: 50,
        },
        {
            title: 'PhoneNo',
            dataIndex: 'phoneNo',
            key: 'phoneNo',
            width: 50,
        },
        {
            title: 'RoleName',
            dataIndex: 'roleNo',
            key: 'roleNo',
            width: 50,
        },
    ];

    return (
        <div className="content-wrapper" >
            <div className="p-3"><h3>Seasonal Player Gameslog</h3></div>
            <section className="content">
                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-header">
                                <h3 className="card-title">Table</h3>
                            </div>
                            <div className="card-body">
                                <Table columns={columns} dataSource={seasonalPlayerLog} scroll={{ x: 700 }} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default SeasonalGamesLog;
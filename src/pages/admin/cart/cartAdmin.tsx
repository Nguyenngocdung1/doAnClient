import { useMutation, useQuery } from '@apollo/client';
import { Button, Spin, Table } from 'antd';
import React, { useState } from 'react'
import { getOrders } from '../../../graphql-client/query';
import formatprice from '../../../common/formatprice';
import { Link } from 'react-router-dom';

interface Props {
    
}

const columns = [
    {
        title: 'Tên khách hàng',
        dataIndex: 'name',
    },
    {
        title: 'Email',
        dataIndex: 'email',
    },
    {
        title: 'Address',
        dataIndex: 'address',
    },
    {
        title: 'Phone',
        dataIndex: 'phone',
    },
    {
        title: 'Số lượng',
        dataIndex: 'orderCount',
    },  
    {
        title: 'Tổng tiền',
        dataIndex: 'total',
    },  
    {
        title: 'Xem chi tiết',
        dataIndex: 'cartDetail',
    },    
];



const CartAdmin = (props: Props) => {
    const [selectedRowKeys, setSelectedRowKeys] = useState<Array<string>>([])
    const { loading, error, data } = useQuery(getOrders)
    // const [add, Mutation] = useMutation<any>(deleteBook);
    if (loading) {
        return <Spin size="large" />
    }
    if (error) {
        return <p>error book ...</p>
    }
    const start = () => {
        setTimeout(() => {
            setSelectedRowKeys([]);
        }, 1000);
    };

    console.log(data);
    
    const data1: any[] | undefined = [];
    for (let i = 0; i < data.orders.length; i++) {
        const listOrder = JSON.parse(data.orders[i].listOrder);
        let total = 0;
        listOrder.forEach((item: any) => {
            total += item.quantity*item.book.price
        })
        data1.push({
            key: data.orders[i].id,
            name: data.orders[i].name,
            email: data.orders[i].email,
            address: data.orders[i].address,
            phone: data.orders[i].phone,
            orderCount: listOrder.length,
            total: formatprice(total),
            cartDetail: <Button type="primary"><Link to={"/admin/cartDetail/" + data.orders[i].id}>Xem chi tiết</Link></Button>
        });
    }

    const onSelectChange = (selectedRowKeys: any) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        setSelectedRowKeys(selectedRowKeys);
    };

    const hasSelected = selectedRowKeys.length > 0;
    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };
    return (
        <div>
            <div style={{ marginBottom: 16 }}>
                <Button type="primary" onClick={start} disabled={!hasSelected} loading={false}>
                    Bỏ chọn
                </Button>
                <span style={{ marginLeft: 8 }}>
                    {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
                </span>
            </div>
            <Table rowSelection={rowSelection} columns={columns} dataSource={data1} />
        </div>
    )
}

export default CartAdmin

import { GetServerSideProps } from 'next/types';
import React, { useState } from 'react';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import useAuth from '../../hooks/useAuth';
import { supabaseEnv } from '../../config/config';
import { AiOutlineUser } from 'react-icons/ai';
import { useRecoilState } from 'recoil';
import { totalOrderListState } from '../../state/state';
import { priceComma } from '../../utils/priceComma';
import Link from 'next/link';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const supabase = createServerSupabaseClient(context, supabaseEnv);

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session?.user) {
    return {
      props: { email: session.user.email },
    };
  } else
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
};

const ProfilePage = ({ email }: { email: string }) => {
  const [totalOrderList, setTotalOrderList] = useRecoilState(totalOrderListState);
  const beforeShipping = totalOrderList.filter((order) => order.status === 'BeforeShipping');
  const duringShipping = totalOrderList.filter((order) => order.status === 'DuringShipping');
  const afterShipping = totalOrderList.filter((order) => order.status === 'AfterShipping');
  const purchaseConfirm = totalOrderList.filter((order) => order.status === 'PurchaseConfirm');
  const [status, setStatus] = useState('');
  return (
    <div className="flex items-center justify-center h-full">
      <div className="flex flex-col w-full h-full gap-8 px-4 py-8 max-w-7xl">
        <div className="flex flex-col gap-1">
          <span className="flex items-center justify-center w-12 h-12 mx-auto rounded-full bg-mint">
            <AiOutlineUser size={30} className="text-brown" />
          </span>
          <span className="mx-auto font-medium text-beige">{email}</span>
        </div>
        <div className="flex w-full max-w-lg gap-2 mx-auto">
          {[
            { value: totalOrderList.length, title: '??????', status: '' },
            { value: beforeShipping.length, title: '?????????', status: 'BeforeShipping' },
            { value: duringShipping.length, title: '?????????', status: 'DuringShipping' },
            { value: afterShipping.length, title: '????????????', status: 'AfterShipping' },
            { value: purchaseConfirm.length, title: '????????????', status: 'PurchaseConfirm' },
          ].map((element) => (
            <div
              className="flex flex-col justify-center items-center  bg-orange w-1/5 py-1.5 rounded-md shadow-md cursor-pointer"
              key={element.title}
              onClick={() => setStatus(element.status)}
            >
              <span className="text-lg font-semibold text-beige">{element.value}</span>
              <span className="text-sm text-beige">{element.title}</span>
            </div>
          ))}
        </div>{' '}
        <table>
          <thead>
            <tr className="border-y border-ocher">
              {['????????????', '????????????', '????????????', '????????????', '????????????'].map((element) => (
                <th className="p-3 text-beige" key={element}>
                  {element}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {totalOrderList.length > 0 ? (
              totalOrderList
                .filter((order) => order.status.includes(status))
                .map((order) => (
                  <tr key={order.id} className="border-b border-ocher/50">
                    <td className="p-3 ">
                      <Link href={`/shop/product/${order.id}`} className="flex gap-2">
                        <div className="flex items-center justify-center w-24 h-24 font-semibold cursor-pointer bg-mint text-orange">???????????????</div>
                        <div className="flex flex-col flex-auto h-full gap-2 my-auto ">
                          <span className="font-medium cursor-pointer text-beige">{order.productName}</span>
                          <span className="text-ocher">{order.size}</span>
                        </div>
                      </Link>
                    </td>
                    <td>
                      <Link href={`/shop/product/${order.id}`} className="flex items-center justify-center cursor-pointer text-beige">
                        {order.id}
                      </Link>
                    </td>
                    <td>
                      <div className="flex flex-col items-center justify-center gap-2 text-beige">
                        <span>{priceComma(order.price)} ???</span>
                        <span>1???</span>
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center justify-center text-beige">{order.orderDate}</div>
                    </td>
                    <td>
                      <div className="flex flex-col items-center justify-center gap-2 text-beige">
                        {order.status !== 'PurchaseConfirm' ? (
                          <>
                            <button
                              type="button"
                              className="px-4 py-1 rounded-md  bg-beige text-orange"
                              onClick={() => {
                                setTotalOrderList([
                                  ...totalOrderList.map((element) => (element.id === order.id ? { ...order, status: 'PurchaseConfirm' } : element)),
                                ]);
                              }}
                            >
                              ????????????
                            </button>
                            <button type="button" className="px-4 py-1 rounded-md border border-beige text-beige">
                              ????????????
                            </button>
                          </>
                        ) : (
                          <span>????????????</span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
            ) : (
              <tr>
                <td className="px-3 py-3" colSpan={5}>
                  <div className="flex items-center justify-center w-full p-12 text-beige">????????? ????????? ????????????.</div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProfilePage;

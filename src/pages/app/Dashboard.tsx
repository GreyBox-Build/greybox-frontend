import {
  Deposit,
  Notification,
  SendQ,
  UserLogo,
  Withdraw,
} from "../../components/icons/Icons";
import AppLayout from "./AppLayout";
import { useState } from "react";
import { depositData, historyData, withdrawalData } from "../../utils/Dummies";
import { DateHead, DetailsCard, QuickLink } from "../../components/Cards";
import { useNavigate } from "react-router-dom";
import { useGetAuthUserQuery } from "../../appSlices/apiSlice";
import moment from "moment";

const Dashboard = () => {
  const navigate = useNavigate();
  const [tab, setTab] = useState<"deposits" | "withdrawals" | "history">(
    "deposits"
  );

  const tabData =
    tab === "deposits"
      ? depositData
      : tab === "withdrawals"
      ? withdrawalData
      : historyData;

  const { currentData: userData, isFetching } = useGetAuthUserQuery({});
  const personInfo = userData?.data?.personal_details;
  const walletInfo = userData?.data?.wallet_details;

  return (
    <AppLayout
      child={
        <div className="w-full md:w-[50.33%] lg:w-[45.33%] min-h-[100vh] bg-grey-2 p-[51px_25px]">
          <section className="w-full flex justify-between items-center">
            <Notification
              current={4}
              onClick={() => navigate("/notifications")}
            />
            <div>
              <p className="text-center text-[0.875rem] text-grey-1 leading-[18px]">
                Welcome,
              </p>
              <p className="text-center text-white text-[1.25rem] font-[600]">
                {isFetching
                  ? null
                  : `${personInfo?.first_name} ${personInfo?.last_name}`}
              </p>
            </div>
            <UserLogo
              firstCharacterOfName={personInfo?.first_name?.substring(0, 1)}
              onClick={() => navigate("/settings")}
            />
          </section>
          <section className="w-full pb-[21px] bg-grey-3 rounded-[40px] mt-[59px]">
            <div className="w-full flex flex-col items-center py-[18px] gap-y-[10px] text-white bg-orange-1 rounded-[40px]">
              <p className="text-[0.75rem] text-center leading-[12px]">
                Total Balance
              </p>
              <p className="text-[2.125rem] font-[700]">
                {personInfo?.currency}
                {walletInfo?.accountBalance !== undefined
                  ? parseFloat(walletInfo?.accountBalance)
                      .toFixed(2)
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  : "0.00"}
              </p>
              <p className="text-[0.625rem] text-grey-1">
                Last Updated {moment(personInfo?.UpdatedAt).toNow()}
              </p>
            </div>

            <section className="w-full flex justify-between md:justify-center px-[51px] md:gap-x-[55px] mt-[15px]">
              <QuickLink
                icon={<Deposit />}
                label="Deposit"
                onClick={() => navigate("/deposit-options")}
              />
              <QuickLink
                icon={<SendQ />}
                label="Send"
                onClick={() => navigate("/send-options")}
              />

              <QuickLink
                icon={<Withdraw />}
                label="Withdraw"
                onClick={() => navigate("/withdrawal-options")}
              />
            </section>
          </section>
          <section className="bg-grey-1 rounded-[40px_40px_0px_0px] mt-[24px]">
            <div className=" pt-[34px] mx-[23px] border-b-[2px] border-b-grey-4 flex items-center justify-between">
              <div className="flex items-center gap-x-[10px] md:gap-x-[24px]">
                <button
                  className={`${
                    tab === "deposits"
                      ? "border-b-orange-1 border-b-[2px]  font-[700] text-black-2  "
                      : "font-[400] text-black-3"
                  } text-[0.875rem] mb-[-2px] pr-[5px] leading-[18px] transition-all duration-300 ease-in-out  `}
                  onClick={() => setTab("deposits")}
                >
                  Deposits
                </button>
                <button
                  className={`${
                    tab === "withdrawals"
                      ? "border-b-orange-1 border-b-[2px]  font-[700] text-black-2  "
                      : "font-[400] text-black-3"
                  } text-[0.875rem] mb-[-2px] pr-[5px] leading-[18px] transition-all duration-300 ease-in-out  `}
                  onClick={() => setTab("withdrawals")}
                >
                  Withdrawals
                </button>
                <button
                  className={`${
                    tab === "history"
                      ? "border-b-orange-1 border-b-[2px]  font-[700] text-black-2  "
                      : "font-[400] text-black-3"
                  } text-[0.875rem] mb-[-2px] pr-[5px] leading-[18px] transition-all duration-300 ease-in-out  `}
                  onClick={() => setTab("history")}
                >
                  History
                </button>
              </div>
              <button
                className="text-[0.75rem] text-orange-1 leading-[18px] min-w-fit"
                onClick={() => navigate("/all-transactions")}
              >
                View all
              </button>
            </div>
            {tabData?.map((deposit) => {
              return (
                <div key={deposit.id}>
                  <DateHead date={deposit.date} />
                  {deposit.details.map((details, index) => {
                    return (
                      <DetailsCard
                        label={details.label}
                        time={details.time}
                        amount={details.amount}
                        index={index}
                        length={deposit.details.length}
                        onClick={() => {}}
                      />
                    );
                  })}
                </div>
              );
            })}
          </section>
        </div>
      }
    />
  );
};

export default Dashboard;

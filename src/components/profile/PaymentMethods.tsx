import React from "react";
import styled from "styled-components";
import editBtnIcon from "../../assets/editbtn.svg";
import tickIconSelected from "../../assets/tickIconSelected.svg";
import tickIconUnselected from "../../assets/tickIconUnselected.svg";
import masterCardIcon from "../../assets/mastercardicon.svg";
import visaCardIcon from "../../assets/visacardicon.svg";
import { PLANS } from "@/utils/constants";

type PaymentMethodProps = {};
export const PaymentMethods = ({}: PaymentMethodProps) => {
  return (
    <Container className=" container-fluid text-white bg-green gap-4 ms-0" style={{ width: "50%" }}>
      <div className="row gap-3">
        {PLANS.map((plan) => {
          return (
            <div
              className=" row gap-sm-1  border border-success rounded align-content-start align-items-center ms-0"
              key={plan.card}
            >
              <div className="detailrow col-1 justify-content-start align-items-center p-4">
                <img src={plan.isCurrent ? tickIconSelected : tickIconUnselected} />
              </div>
              <div className="col-1 mx-3">
                <img src={plan.cardType === "master" ? masterCardIcon : visaCardIcon} />
              </div>
              <div className="col-6">
                <label>{plan.card}</label>
                <label>{plan.expiry}</label>
              </div>
              <div className="col-1 ms-auto me-3">
                <img src={editBtnIcon} />
              </div>
            </div>
          );
        })}
      </div>
    </Container>
  );
};
// #endregion

export default PaymentMethods;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background-color: transparent;
  align-content: center;
  .userotherdetails {
    width: 22rem;
    height: 25rem;
    overflow: auto;
    background-color: transparent;
    display: flex;
    flex-direction: column;
    padding: 0.5rem;
    vertical-align: middle;
    gap: 2rem;
    .singleinfoitem {
      height: 7rem;
      padding: 0.6rem;
      display: flex;
      flex-direction: column;
      gap: 0.7rem;
      justify-content: left;
      align-items: left;
      border: 0.1rem solid #00c28c10;
      border-radius: 0.6rem;
      .titlelabel {
        color: #00c28c;
        font-size: 1rem;
      }
      label {
        font-size: 0.7rem;
      }
      .detailrow {
        width: 20rem;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        .priceandeditbtn {
          gap: 0.5rem;
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;
          label {
            color: #00c28c;
            font-size: 1rem;
          }
        }
      }
    }
  }
`;
// paymentMethods: [{card: "************7685", expiry: "10/2024", cardType: "master", isCurrent: true}, {card: "************9732", expiry: "06/2026", cardType: "visa", isCurrent: false}]

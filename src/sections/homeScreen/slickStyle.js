import styled from "styled-components";

export const HomeWrapper = styled.div`
  .slick-arrow {
 
    background-color: green;
    height: 35px;
    width: 35px;
    border-radius: 100px;
    padding:0 5px;
  }
  .slick-arrow:hover,
  .slick-arrow:active,
  .slick-arrow:focus {
    background-color: green !important;
  }
  @media (max-width: 991px) {
    .slick-arrow {
      visibility:hidden;
      background-color: transparent;
      height: 0px;
      width: 0px;
      border-radius: 0px;
      padding:0;
    }
  }
`;

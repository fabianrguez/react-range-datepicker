import styled from 'styled-components';

export const StyledCalendarWrapper = styled.div`
  display: flex;
  position: relative;
`;

export const StyledCalendarInputs = styled.section`
  display: flex;
  width: 100%;
  z-index: 1;
`;

export const StyledCalendarInput = styled.fieldset`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid black;
  position: relative;
  flex: 1;
  height: 3rem;

  & label {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 0;
    padding-left: 0.25rem;
    pointer-events: none;
  }

  & input {
    width: 100%;
    flex: 1;
    text-align: right;

    &,
    &:focus {
      outline: none;
      border: none;
    }
  }
`;

export const StyledCalendarMonths = styled.div`
  display: flex;
  flex-wrap: wrap;
  position: absolute;
  transform: ${({ isVisible }) => (isVisible ? 'translateY(50px)' : 'translateY(0)')};
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  visibility: ${({ isVisible }) => (isVisible ? 'visible' : 'hidden')};
  transition: transform 0.5s, opacity 0.3s, visibility 0.2s;
  width: 100%;
  gap: 0.35rem;
  background: #e8e8e8;
  padding: 0.5rem;
  border-radius: 12px;
`;

export const StyledCalendarMonth = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export const StyledCalendarHeader = styled.header`
  display: flex;
  align-items: center;
  height: 4rem;

  & h2 {
    flex: 1;
    display: flex;
    align-items: center;
  }
`;

export const StyledCalendarWeeks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
`;

export const StyledCalendarWeekDays = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 0.15rem;

  & > * {
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;
  }

  & > span {
    font-weight: 600;
  }

  & > button {
    background: transparent;
    padding: 0.35rem 0.75rem;
    border-radius: 6px;
    transition: all 0.3s;

    &:hover:not(.active) {
      background: #cecece;
    }

    &.active {
      background: rebeccapurple;
      color: #ffffff;
    }
    &.placeholder {
      border: transparent;
      background: transparent;
      pointer-events: none;
    }
  }
`;

export const StyledNavigationButton = styled.button`
  display: inline-flex;
  align-items: center;
  padding: 0.75rem;
  height: 2rem;
  width: 2rem;
  border-radius: 50%;
  margin: 0.5rem;
  ${({ isHidden }) => isHidden &&  `
    opacity: 0;
    pointer-events: none;
  `}
`;

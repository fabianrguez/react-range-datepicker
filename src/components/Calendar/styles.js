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
  position: relative;

  &:not(:first-of-type) {
    &::before {
      content: '';
      position: absolute;
      background: #663399;
      height: 100%;
      width: 2px;
      transform: translateX(-4px);
    }
  }
`;

export const StyledCalendarHeader = styled.header`
  display: flex;
  align-items: center;
  height: 4rem;
  background: #663399;
  color: #ffffff;
  border-radius: 4px;
  margin-bottom: 0.75rem;

  & h2 {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
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
  /* gap: 0.15rem; */

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
    transition: all 0.3s;
    font-size: 1.5ch;

    &:hover:not(.active) {
      background: #cecece;
      border-radius: 6px;
    }

    &.active {
      background: #663399;
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
  justify-content: center;
  padding: 0.75rem;
  height: 2rem;
  width: 2rem;
  background: #e8e8e8;
  border-top-left-radius: ${({ isGoingRight }) => (isGoingRight ? '50%' : 0)};
  border-bottom-left-radius: ${({ isGoingRight }) => (isGoingRight ? '50%' : 0)};
  border-top-right-radius: ${({ isGoingRight }) => (isGoingRight ? 0 : '50%')};
  border-bottom-right-radius: ${({ isGoingRight }) => (isGoingRight ? 0 : '50%')};
  transition: all 0.3s;
  ${({ isHidden }) =>
    isHidden &&
    `
    opacity: 0;
    pointer-events: none;
  `}
`;

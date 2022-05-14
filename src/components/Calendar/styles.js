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

    &, &:focus {
      outline: none;
      border: none;
    }
  }
`

export const StyledCalendarMonths = styled.div`
  display: flex;
  position: absolute;
  transform: ${({ isVisible }) => (isVisible ? 'translateY(60px)' :'translateY(0)')};
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  visibility: ${({ isVisible }) => (isVisible ? 'visible' : 'hidden')};
  transition: transform 0.5s, opacity 0.3s, visibility 0.2s;
  width: 100%;
`;

export const StyledCalendarMonth = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  border: 1px solid black;
`

export const StyledCalendarWeeks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
`;

export const StyledCalendarWeekDays = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 0.35rem;

  & > * {
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;
    flex-basis: 0;
  }

  & > button {
    &.active {
      background: rebeccapurple;
      color: #fff;
    }
    &.placeholder {
      border: transparent;
      background: transparent;
      pointer-events: none;
    }
  }
`

import { useSelector, useDispatch } from 'react-redux';
import { closeModal } from '../store/modalSlice';
import { ViewTransaction } from '../containers/ViewTransaction';
import { ViewOrder } from '../containers/ViewOrder';
import { CreateOrderForm } from './CreateOrderForm';
import { ConfirmAction } from '../containers/ConfirmAction';
import { Modal, Message } from '../components';

const ModalManager = () => {
  const dispatch = useDispatch();
  const { isOpen, componentName, childrenProps } = useSelector(
    (state) => state.modal
  );

  const closeModalHandler = () => dispatch(closeModal());

  const componentsLookUp = {
    ViewTransaction,
    CreateOrderForm,
    ViewOrder,
    Message,
    ConfirmAction,
  };
  let renderComponent;
  console.log('componentName: ' + componentName);
  if (componentName) {
    const SelectedComponent = componentsLookUp[componentName];

    if (SelectedComponent) {
      renderComponent = (
        <SelectedComponent
          {...childrenProps}
          closeModalHandler={closeModalHandler}
        />
      );
    }
  }

  return (
    <Modal isOpen={isOpen} closeModalHandler={closeModalHandler}>
      {renderComponent}
    </Modal>
  );
};

export default ModalManager;

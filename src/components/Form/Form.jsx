import { useContext } from "react";


export default function Form ({name, children,titleButton, isValid, onSubmit}){

    const isSend = useContext(SendContext)

    return(
        <form className='popup__form' name={name} onSubmit={onSubmit}>
            {children}
        
        {children}
        <button
          className={`${name ==='signin' || name === 'signup' ? 'login__submit-button' : ' popup__submit-button'} 
            ${isSend ? (name ==='signin' || name === 'signup' ? 'login__submit-button_loading' : 'popup__submit-button_loading') : ''}
            ${isValid ? '' : (name ==='signin' || name === 'signup' ? 'login__submit-button_disabled' : 'popup__submit-button_disabled')}`}
          
        
          disabled={isSend}

        >
          {isSend ? '' : titleButton || 'Сохранить'}
        </button>
      </form>
    )
}

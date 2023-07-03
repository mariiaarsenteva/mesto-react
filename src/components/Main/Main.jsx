export default function Main({onEditProfile,onAddPlace,onEditAvatar}){
    return(
     <main className="main">
        <section className="profile">
            <div className="profile__container">
            <button className="profile__avatar-button button" onClick={onEditAvatar}>
                <img className="profile__avatar" src="#" alt="Аватар пользователя"/>
            </button>
            <div className="profile__info">
                <div className="profile__personal-info">
                <h1 className="profile__name"> </h1>
                <button className="profile__edit-button button" type="button" onClick={onEditProfile} />
                </div>
                <p className="profile__job" />
            </div>
            </div>
            <button className="profile__add-button button" type="button" onClick={onAddPlace}/>
        </section>
        <section className="elements">
            <ul className="elements__container" />
        </section>
     </main>

    )
}
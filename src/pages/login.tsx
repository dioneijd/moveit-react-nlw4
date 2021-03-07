import style from '../styles/pages/Login.module.css'

export default function Login() {
    return (
        <div className={style.container}>
            <img src="/logo.svg" alt="Moveit"/>
            <aside>
                <img src="/logo-full-white.svg" alt="Moveit"/>
                <h1>Bem vindo</h1>
                <div>
                    <img src="/git-logo.svg" alt=""/>
                    <p>Faça seu login com o seu usuario do Github</p>
                </div>
                <form>
                    <input type="text"/>
                    <button type="submit">
                        <img src="/icons/arrow-right.svg" alt=""/>
                    </button>
                </form>
            </aside>
        </div>
    )
}

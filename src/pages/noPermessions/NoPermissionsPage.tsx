import { FC } from "react";
import { Layout } from "../../componets";

export const NoPermissionsPage: FC = () => {
    return(
        <Layout>
            <h3>У вас недостаточно прав для работы с системой.</h3>
            <h4>Пожалуйста, ожидайте, пока администратор рассмотрит вашу заявку на работу с системой</h4>
        </Layout>
    )
}
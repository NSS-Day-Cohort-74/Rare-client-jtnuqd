import { useEffect, useState } from "react"


export const SubscriberView = ({ token }) => {
    const [allUserSubscriptions, setAllUserSubscriptions] = useState([])

    useEffect(() => {
        fetch(`http://localhost:8088/subscriptions/${token}`)
        .then(response => response.json())
        .then(data => setAllUserSubscriptions(data))
        .catch(error => console.error("Error with fetching subscriptions", error))
    }, [token])



    return (
        <section>
            {allUserSubscriptions.length > 0 ? (
                <div className="m-5">
                    <h1 className="title is-3 has-text-centered" >Subscriptions</h1>
                    {allUserSubscriptions.map(subscription => {
                    return (
                        <section key={subscription.id} className="card m-3 p-3" >
                            <div>Title: {subscription.title}</div>
                            <div>Author: {subscription.first_name} {subscription.last_name}</div>
                            <div>Category: {subscription.category_label}</div>
                        </section>
                    )
            })} </div>
            ) : (<h2 className="title is-3 has-text-centered" >Subscribe to authors to curate your personal homepage</h2>)
            }
        </section>
    )
}
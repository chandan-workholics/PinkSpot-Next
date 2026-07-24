import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";
import PricingPlanButton from "./PricingPlanButton";

export const metadata = {
    title: "Pricing | Pinkspot.cc",
    description: "Simple, transparent Pinkspot advertising plans for independent providers and agencies.",
    alternates: { canonical: "https://pinkspot.cc/pricing/" },
};

const plans = [
    {
        id: "single",
        name: "Single Ad",
        description: "Perfect for a one-time post.",
        price: "$19.99",
        period: "/ per ad",
        icon: "fa-solid fa-tag",
        badge: "ONE-TIME",
        button: "Get Started",
        className: "",
        features: [
            ["fa-regular fa-camera", "Up to 6 Photos"],
            ["fa-regular fa-circle-xmark", "No Verification"],
            ["fa-regular fa-rectangle-list", "Standard Listing"],
        ],
    },
    {
        id: "silver",
        name: "Silver Plan",
        description: "Post every other day.",
        price: "$69.99",
        period: "/ month",
        icon: "fa-solid fa-medal",
        badge: "BEST VALUE",
        button: "Get Silver",
        className: "pink-pricing-plan--featured",
        features: [
            ["fa-solid fa-shield-halved", "Verification Badge"],
            ["fa-regular fa-camera", "Up to 12 Photos"],
            ["fa-regular fa-calendar-days", "Post Every Other Day"],
        ],
        allowance: "Up to 15 Ads / Month",
        savings: "Save over $229/month compared to posting single ads.",
        savingsBadge: "75% SAVINGS",
    },
    {
        id: "gold",
        name: "Gold Plan",
        description: "Post daily.",
        price: "$99.99",
        period: "/ month",
        icon: "fa-solid fa-crown",
        badge: "MOST POPULAR",
        button: "Get Gold",
        className: "pink-pricing-plan--featured pink-pricing-plan--gold",
        features: [
            ["fa-solid fa-shield-halved", "Verification Badge"],
            ["fa-regular fa-camera", "Up to 12 Photos"],
            ["fa-regular fa-calendar-days", "Post Daily"],
        ],
        allowance: "Up to 30 Ads / Month",
        savings: "Save over $499/month compared to posting single ads.",
        savingsBadge: "80% SAVINGS",
    },
];

export default function PricingPage() {
    return (
        <div className="pink-pricing-page">
            <Header />

            <main className="pink-pricing-main">
                <section className="pink-pricing-shell" aria-labelledby="pricing-title">
                    <header className="pink-pricing-heading">
                        <h1 id="pricing-title">Pricing</h1>
                        <span aria-hidden="true"></span>
                        <p>Simple, transparent pricing. No hidden fees.</p>
                        <small>
                            <i className="fa-solid fa-shield-halved" aria-hidden="true"></i>
                            Cancel your subscription anytime.
                        </small>
                    </header>

                    <div className="pink-pricing-list">
                        {plans.map((plan) => (
                            <article className={`pink-pricing-plan ${plan.className}`} key={plan.name}>
                                <div className="pink-pricing-plan__top">
                                    <div className="pink-pricing-plan__identity">
                                        <div className="pink-pricing-plan__icon" aria-hidden="true">
                                            <i className={plan.icon}></i>
                                        </div>
                                        <div>
                                            <h2>{plan.name}</h2>
                                            <p>{plan.description}</p>
                                        </div>
                                    </div>
                                    <span className="pink-pricing-plan__badge">
                                        {plan.badge === "MOST POPULAR" && <i className="fa-solid fa-star" aria-hidden="true"></i>}
                                        {plan.badge}
                                    </span>
                                </div>

                                <div className="pink-pricing-plan__purchase">
                                    <div className="pink-pricing-plan__price">
                                        <strong>{plan.price}</strong>
                                        <span>{plan.period}</span>
                                    </div>
                                    <PricingPlanButton plan={plan.id}>
                                        {plan.button}
                                    </PricingPlanButton>
                                </div>

                                <ul className="pink-pricing-plan__features">
                                    {plan.features.map(([icon, label]) => (
                                        <li key={label}>
                                            <i className={icon} aria-hidden="true"></i>
                                            <span>{label}</span>
                                        </li>
                                    ))}
                                </ul>

                                {plan.allowance && (
                                    <div className="pink-pricing-plan__saving">
                                        <i className="fa-solid fa-sack-dollar" aria-hidden="true"></i>
                                        <div>
                                            <strong>{plan.allowance}</strong>
                                            <span>{plan.savings}</span>
                                        </div>
                                        <b>{plan.savingsBadge}</b>
                                    </div>
                                )}
                            </article>
                        ))}
                    </div>

                    <p className="pink-pricing-secure">
                        <i className="fa-solid fa-lock" aria-hidden="true"></i>
                        All payments are secure and encrypted.
                    </p>
                </section>
            </main>

            <Footer />
        </div>
    );
}

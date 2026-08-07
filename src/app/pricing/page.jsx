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
        description: "Valid for 30 days.",
        price: "$19.99",
        period: "/ per ad",
        icon: "fa-solid fa-tag",
        badge: "PAY AS YOU GO",
        button: "Get Started",
        className: "",
        features: [
            ["fa-solid fa-check", "Up to 12 Photos"],
            ["fa-solid fa-check", "Standard Listing"],
            ["fa-solid fa-check", "No verification badge"],
        ],
    },
    {
        id: "silver",
        name: "Silver Plan",
        description: "Valid for 30 days.",
        price: "$69.99",
        period: "/ month",
        icon: "fa-solid fa-medal",
        badge: "MOST POPULAR",
        button: "Get Silver",
        className: "pink-pricing-plan--featured",
        features: [
            ["fa-solid fa-check", "Verification Badge"],
            ["fa-solid fa-check", "Up to 12 Photos"],
            ["fa-solid fa-check", "15 Ads (Post Anytime)"],
            ["fa-solid fa-check", "Save over $229/month"],
        ],
    },
    {
        id: "gold",
        name: "Gold Plan",
        description: "Valid for 30 days.",
        price: "$99.99",
        period: "/ month",
        icon: "fa-solid fa-crown",
        badge: "BEST VALUE",
        button: "Get Gold",
        className: "pink-pricing-plan--featured pink-pricing-plan--gold",
        features: [
            ["fa-solid fa-check", "Verification Badge"],
            ["fa-solid fa-check", "Up to 12 Photos"],
            ["fa-solid fa-check", "Post Daily (Up to 30 Ads/Month)"],
            ["fa-solid fa-check", "Save over $499/month"],
        ],
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

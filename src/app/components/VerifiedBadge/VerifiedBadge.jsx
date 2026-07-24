import { isAccountVerified } from "../../../utils/verification";

export default function VerifiedBadge({ record, compact = false }) {
    if (!isAccountVerified(record)) return null;

    return (
        <span className={`account-verified-badge ${compact ? "account-verified-badge--compact" : ""}`} title="Verified account">
            <i className="fa-solid fa-circle-check" aria-hidden="true"></i>
            <span>Verified</span>
        </span>
    );
}

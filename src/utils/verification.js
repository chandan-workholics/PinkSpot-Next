const verifiedValues = new Set([true, 1, "1", "true", "verified"]);

export function isAccountVerified(record) {
    const candidates = [
        record?.userVerified,
        record?.isUserVerified,
        record?.accountVerified,
        record?.isProfileVerified,
        record?.user?.isProfileVerified,
        record?.userId?.isProfileVerified,
        record?.postbyuserid?.isProfileVerified,
        record?.createdBy?.isProfileVerified,
        record?.account?.isProfileVerified,
    ];

    return candidates.some((value) => verifiedValues.has(
        typeof value === "string" ? value.toLowerCase() : value
    ));
}

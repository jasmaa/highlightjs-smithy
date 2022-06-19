resource ResourceA {
    identifiers: {
        a: String
    },
    resources: [ResourceB],
}

resource ResourceB {
    identifiers: {
        a: String,
        b: String,
    },
    resources: [ResourceC],
}

resource ResourceC {
    identifiers: {
        a: String,
        b: String,
        c: String,
    }
}
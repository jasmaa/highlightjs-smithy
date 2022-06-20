// comment 1
metadata Foo = {
  // comment 2
  bar1: Bar,
  bar2: {
    key1: "key1",
    key2: 80,
    key3: [1, 2, "three"],
  },
  bar3: [
    1,
    "two",
    {
      key1: "key1", // comment 3
      key2: 80,
      key3: [1, 2, "three"],
    }
  ]
}
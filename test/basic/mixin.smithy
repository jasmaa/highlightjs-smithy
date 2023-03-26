/// Generic mixin documentation.
@tags(["a"])
@mixin
structure UserInfoMixin {
    userId: String
}

structure UserSummary with [UserInfoMixin] {}
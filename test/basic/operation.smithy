namespace smithy.example

operation MyOperation {
    input: MyOperationInput,
    output: MyOperationOutput,
    errors: [NotFoundError, BadRequestError]
}

@input
structure MyOperationInput {}

@output
structure MyOperationOutput {}
$version: "2"
namespace com.example.infinidash

@title("Infinidash service")
service InfinidashService {
  version: "2006-03-01",
  resources: [
    Dash,
  ],
}

@documentation("Dash is a laminar microflow that dashes at a user-specified cadence.")
resource Dash {
  identifiers: {
    dashId: String,
  },
  properties: {
    name: String,
    speed: Float,
    isDashing: Boolean,
    timesDashed: Integer,
    createdAt: Timestamp,
    updatedAt: Timestamp,
  },
  create: CreateDash,
  list: ListDashes,
  read: GetDash,
  update: UpdateDash,
  delete: DeleteDash,
}

@idempotent
operation CreateDash {
  input: CreateDashInput,
  output: CreateDashOutput,
}

@input
structure CreateDashInput {
  @idempotencyToken
  clientToken: String,
  @required
  name: String,
  speed: Float,
}

@output
structure CreateDashOutput {
  @nestedProperties
  dashData: DashData,
}

@readonly
@paginated(inputToken: "nextToken", outputToken: "nextToken", pageSize: "maxResults", items: "dashes")
operation ListDashes {
  input: ListDashesInput,
  output: ListDashesOutput,
}

@input
structure ListDashesInput {
  nextToken: String,
  maxResults: Integer,
}

@output
structure ListDashesOutput {
  @required
  dashes: DashDataList,
  nextToken: String,
  maxResults: Integer,
}

@readonly
operation GetDash {
  input: GetDashInput,
  output: GetDashOutput,
}

@input
structure GetDashInput for Dash {
  @required
  $dashId,
}

@output
structure GetDashOutput {
  @nestedProperties
  dash: DashData,
}

operation UpdateDash {
  input: UpdateDashInput,
  output: UpdateDashOutput,
}

@input
structure UpdateDashInput for Dash {
  @required
  $dashId,
  $speed,
  $isDashing,
}

@output
structure UpdateDashOutput {
  @nestedProperties
  dash: DashData,
}

@idempotent
operation DeleteDash {
  input: DeleteDashInput,
  output: DeleteDashOutput,
}

@input
structure DeleteDashInput for Dash {
  @required
  $dashId,
}

@output
structure DeleteDashOutput {}

structure DashData for Dash {
  @resourceIdentifier("dashId")
  @required
  $dashId,
  @documentation("Name of the dash")
  @required
  $name,
  @documentation("Rate in datum per millisecond at which dash runs.")
  @required
  $speed,
  @documentation("Number of times the dash has run.")
  @required
  $timesDashed,
  @documentation("Whether or not a dash is currently running.")
  @required
  $isDashing,
  @documentation("Timestamp for when dash was created.")
  @required
  $createdAt,
  @documentation("Timestamp of last time dash was updated.")
  $updatedAt,
}

list DashDataList {
  member: DashData,
}
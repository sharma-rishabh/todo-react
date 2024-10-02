const { PactV3 } = require("@pact-foundation/pact");
const path = require("path");
const { getApi } = require("./api");

describe("Consumer", () => {
  const provider = new PactV3({
    consumer: "TodoConsumer",
    provider: "TodoProvider",
    dir: path.resolve(process.cwd(), "pacts"),
  });

  it("should return a todo", () => {
    const EXPECTED_RESPONSE = {
      id: 1,
      title: "Do the laundry",
      description: "Wash, dry, fold, and put away clothes",
    };
    provider
      .given("todo with id 1 exists")
      .uponReceiving("a request for a todo")
      .withRequest({
        method: "GET",
        path: "/api/todo/1",
      })
      .willRespondWith({
        status: 200,
        headers: { "Content-Type": "application/json" },
        body: EXPECTED_RESPONSE,
      });


    return provider.executeTest(async (mockServer) => {
      const api = getApi(mockServer.url);
      await api.TodoService.getTodo(1)
        .then((res) => res.json())
        .then((todo) => {
          expect(todo).toEqual({ ...EXPECTED_RESPONSE });
        });
      return;
    });
  });

  it("should return 404", () => {
    provider
      .given("todo not found")
      .uponReceiving("a request for a todo that does not exist")
      .withRequest({
        method: "GET",
        path: "/api/todo/100",
      })
      .willRespondWith({
        status: 404,
        headers: { "Content-Type": "application/json" },
      });

    return provider.executeTest(async (mockServer) => {
      const api = getApi(mockServer.url);
      await api.TodoService.getTodo(100).then((res) =>
        expect(res.status).toEqual(404)
      );
      return;
    });
  });
});

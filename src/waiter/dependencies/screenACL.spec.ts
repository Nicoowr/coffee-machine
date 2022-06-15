import { formatMessage } from "./formatMessageACL";

describe("screenACL.spec", () => {
    test("Should format the message correctly", () => {
        // GIVEN
        const message = `Missing 0.3€ to complete order`
        // WHEN
        const formattedMessage = formatMessage(message);
        // THEN
        expect(formattedMessage).toEqual("M:Missing 0.3€ to complete order")
    })
})
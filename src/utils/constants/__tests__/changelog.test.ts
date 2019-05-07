import changelog from "../changelog"

describe("Changelog list", () => {
  it("should be properly formatted", () => {
    changelog.forEach(entry => {
      expect(entry).toHaveProperty("changelog")
      expect(entry).toHaveProperty("date")
      expect(entry).toHaveProperty("link")
      expect(entry).toHaveProperty("version")
    })
  })
})
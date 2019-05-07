import changelog from "../changelog"
import moment from "moment";

describe("Changelog list", () => {
  it("should have the necessary keys", () => {
    changelog.forEach(entry => {
      expect(entry).toHaveProperty("changelog")
      expect(entry).toHaveProperty("date")
      expect(entry).toHaveProperty("link")
      expect(entry).toHaveProperty("version")
    })
  })
  it("should have properly formatted dates", () => {
    changelog.forEach(entry => {
      expect(entry.date).toBeInstanceOf(moment)
      expect(entry.date.isValid()).toEqual(true)
    })
  })
  it("should have serialized version numbers", () => {
    const versionList = new Set();

    changelog.forEach(entry => {
      expect(versionList.has(entry.version)).toEqual(false)
      versionList.add(entry.version)
    })
  })
})
import { formatUSD, formatPerc, computeEvenDollarAmounts } from "./Calculator";

import { describe, expect, it } from "vitest";

describe("formatUSD", () => {
  it("should format a number as USD with cents", () => {
    expect(formatUSD(1)).toBe("$1.00");
    expect(formatUSD(1.5)).toBe("$1.50");
    expect(formatUSD(1.505)).toBe("$1.51");
  });

  it("should format a number as USD without cents", () => {
    expect(formatUSD(1, false)).toBe("$1");
    expect(formatUSD(1.499, false)).toBe("$1");
    expect(formatUSD(1.505, false)).toBe("$2");
  });

  it("should format a number as USD with cents and commas", () => {
    expect(formatUSD(1000)).toBe("$1,000.00");
    expect(formatUSD(1000.5)).toBe("$1,000.50");
    expect(formatUSD(1000.505)).toBe("$1,000.51");
  });

  it("should format without a dollar sign if requested", () => {
    expect(formatUSD(1, true, false)).toBe("1.00");
    expect(formatUSD(1.5, true, false)).toBe("1.50");
    expect(formatUSD(1.505, true, false)).toBe("1.51");
  });
});

describe("formatPerc", () => {
  it("should format a number as a percentage", () => {
    expect(formatPerc(1)).toBe("100%");
    expect(formatPerc(1.5)).toBe("150%");
    expect(formatPerc(0.02)).toBe("2%");
  });
});

describe("computeEvenDollarAmounts", () => {
  it("Gives 100% to the only available allocation", () => {
    const percs = [1.0];
    const result = computeEvenDollarAmounts(percs, 50);
    expect(result).toEqual([50]);
  });

  it("Gives 50% to each of two allocations", () => {
    const percs = [0.5, 0.5];
    const result = computeEvenDollarAmounts(percs, 50);
    expect(result).toEqual([25, 25]);
  });

  it("Gives evenly to four allocations", () => {
    const percs = [0.4, 0.2, 0.2, 0.2];
    const result = computeEvenDollarAmounts(percs, 50);
    expect(result).toEqual([20, 10, 10, 10]);
  });

  it("Rounds total cents down", () => {
    const percs = [1.0];
    const result = computeEvenDollarAmounts(percs, 50.95);
    expect(result).toEqual([50]);
  });

  it("Adjusts larger categories down by $2 if the sum doesn't match the total", () => {
    const percs = [0.4, 0.2, 0.2, 0.2];
    const result = computeEvenDollarAmounts(percs, 23);
    expect(result).toEqual([8, 5, 5, 5]);
  });

  it("Adjusts larger categories down by $1 if the sum doesn't match the total", () => {
    const percs = [0.4, 0.2, 0.2, 0.2];
    const result = computeEvenDollarAmounts(percs, 24);
    expect(result).toEqual([9, 5, 5, 5]);
  });

  it("Evenly distributes across several categories", () => {
    const percs = [0.4, 0.2, 0.2, 0.2];
    const result = computeEvenDollarAmounts(percs, 25);
    expect(result).toEqual([10, 5, 5, 5]);
  });

  it("Adjusts larger categories up by $1 if the sum doesn't match the total", () => {
    const percs = [0.4, 0.2, 0.2, 0.2];
    const result = computeEvenDollarAmounts(percs, 26);
    expect(result).toEqual([11, 5, 5, 5]);
  });

  it("Adjusts larger categories up by $2 if the sum doesn't match the total", () => {
    const percs = [0.4, 0.2, 0.2, 0.2];
    const result = computeEvenDollarAmounts(percs, 27);
    expect(result).toEqual([12, 5, 5, 5]);
  });
});


import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { getOptimizedImageUrl, getFallbackImageUrl, getTimeAgo } from './image-utils';

describe('Image Utility Functions', () => {
  describe('getOptimizedImageUrl', () => {
    it('returns empty string for empty input', () => {
      expect(getOptimizedImageUrl('')).toBe('');
    });

    it('adds optimization parameters to URL without existing parameters', () => {
      const url = 'https://example.com/image.jpg';
      const expected = 'https://example.com/image.jpg?w=400&q=75&auto=format';
      expect(getOptimizedImageUrl(url)).toBe(expected);
    });

    it('adds optimization parameters to URL with existing parameters', () => {
      const url = 'https://example.com/image.jpg?size=large';
      const expected = 'https://example.com/image.jpg?size=large&w=400&q=75&auto=format';
      expect(getOptimizedImageUrl(url)).toBe(expected);
    });

    it('respects custom width and quality parameters', () => {
      const url = 'https://example.com/image.jpg';
      const expected = 'https://example.com/image.jpg?w=800&q=90&auto=format';
      expect(getOptimizedImageUrl(url, 800, 90)).toBe(expected);
    });
  });

  describe('getFallbackImageUrl', () => {
    it('returns a valid fallback image URL', () => {
      const fallbackUrl = getFallbackImageUrl();
      expect(fallbackUrl).toBe('https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80');
    });
  });

  describe('getTimeAgo', () => {
    beforeEach(() => {
      // Mock Date.now to return a fixed timestamp
      vi.useFakeTimers();
      vi.setSystemTime(new Date('2023-01-10T12:00:00Z'));
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it('returns "Just now" for very recent timestamps', () => {
      const now = new Date('2023-01-10T11:59:30Z').toISOString();
      expect(getTimeAgo(now)).toBe('Just now');
    });

    it('returns minutes ago', () => {
      const fiveMinutesAgo = new Date('2023-01-10T11:55:00Z').toISOString();
      expect(getTimeAgo(fiveMinutesAgo)).toBe('5 minutes ago');
    });

    it('returns singular minute form', () => {
      const oneMinuteAgo = new Date('2023-01-10T11:59:00Z').toISOString();
      expect(getTimeAgo(oneMinuteAgo)).toBe('1 minute ago');
    });

    it('returns hours ago', () => {
      const twoHoursAgo = new Date('2023-01-10T10:00:00Z').toISOString();
      expect(getTimeAgo(twoHoursAgo)).toBe('2 hours ago');
    });

    it('returns days ago', () => {
      const threeDaysAgo = new Date('2023-01-07T12:00:00Z').toISOString();
      expect(getTimeAgo(threeDaysAgo)).toBe('3 days ago');
    });

    it('returns months ago', () => {
      const twoMonthsAgo = new Date('2022-11-10T12:00:00Z').toISOString();
      expect(getTimeAgo(twoMonthsAgo)).toBe('2 months ago');
    });

    it('returns years ago', () => {
      const oneYearAgo = new Date('2022-01-10T12:00:00Z').toISOString();
      expect(getTimeAgo(oneYearAgo)).toBe('1 year ago');
    });

    it('handles invalid date strings', () => {
      const invalidDate = 'not-a-date';
      expect(getTimeAgo(invalidDate)).toBe(invalidDate);
    });
  });
});

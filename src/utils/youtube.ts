/**
 * Utilities for extracting YouTube video IDs and building embedded URLs
 * without requiring the user to leave the app.
 */

export interface YouTubePreset {
  id: string;
  title: string;
  url: string;
  description?: string;
  duration?: string;
}

/**
 * Extracts YouTube Video ID from any valid YouTube URL or raw ID
 */
export function extractYouTubeId(urlOrId: string): string | null {
  if (!urlOrId) return null;
  const trimmed = urlOrId.trim();

  // If already an 11-char ID
  if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) {
    return trimmed;
  }

  try {
    // Regex matching YouTube URLs
    const regExp =
      /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/|youtube\.com\/shorts\/)([^"&?\/\s]{11})/;
    const match = trimmed.match(regExp);
    if (match && match[1]) {
      return match[1];
    }

    // Try URL searchParams
    if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
      const parsedUrl = new URL(trimmed);
      if (parsedUrl.hostname.includes('youtube.com')) {
        const v = parsedUrl.searchParams.get('v');
        if (v && /^[a-zA-Z0-9_-]{11}$/.test(v)) return v;
      }
      if (parsedUrl.hostname === 'youtu.be') {
        const pathId = parsedUrl.pathname.replace(/^\//, '');
        if (/^[a-zA-Z0-9_-]{11}$/.test(pathId)) return pathId;
      }
    }
  } catch {
    // invalid URL format
  }

  return null;
}

/**
 * Parses time strings like "1:31 - 3:30", "01:31", "90s", "1m30s" into start seconds
 */
export function parseTimestampToSeconds(timeStr: string): number {
  if (!timeStr) return 0;
  
  // If it's a range like "1:31 - 3:30", take the first part
  const firstPart = timeStr.split('-')[0].trim();

  // Check mm:ss or hh:mm:ss format
  const colonMatch = firstPart.match(/^(?:(\d+):)?(\d+):(\d+)$/);
  if (colonMatch) {
    if (colonMatch[1]) {
      // hh:mm:ss
      return parseInt(colonMatch[1], 10) * 3600 + parseInt(colonMatch[2], 10) * 60 + parseInt(colonMatch[3], 10);
    }
    // mm:ss
    return parseInt(colonMatch[2], 10) * 60 + parseInt(colonMatch[3], 10);
  }

  // Check mm:ss with single digit minute e.g. "1:30"
  const simpleColon = firstPart.match(/^(\d+):(\d{2})/);
  if (simpleColon) {
    return parseInt(simpleColon[1], 10) * 60 + parseInt(simpleColon[2], 10);
  }

  // Check seconds like "90s" or raw numbers
  const secMatch = firstPart.match(/^(\d+)s?$/);
  if (secMatch) {
    return parseInt(secMatch[1], 10);
  }

  return 0;
}

/**
 * Builds safe privacy-enhanced YouTube embed URL
 */
export function buildYouTubeEmbedUrl(
  videoId: string,
  startTime: number = 0,
  autoplay: boolean = false
): string {
  const params = new URLSearchParams({
    enablejsapi: '1',
    rel: '0',
    modestbranding: '1',
    playsinline: '1',
    origin: typeof window !== 'undefined' ? window.location.origin : ''
  });

  if (startTime > 0) {
    params.set('start', startTime.toString());
  }

  if (autoplay) {
    params.set('autoplay', '1');
  }

  return `https://www.youtube-nocookie.com/embed/${videoId}?${params.toString()}`;
}

const STORAGE_PREFIX = 'ems_video_portion_';

export function getPortionStoredVideoUrl(portionId: string): string | null {
  if (typeof window === 'undefined') return null;
  try {
    return localStorage.getItem(`${STORAGE_PREFIX}${portionId}`);
  } catch {
    return null;
  }
}

export function setPortionStoredVideoUrl(portionId: string, url: string): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(`${STORAGE_PREFIX}${portionId}`, url);
  } catch {
    // localStorage might be unavailable
  }
}

export function clearPortionStoredVideoUrl(portionId: string): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(`${STORAGE_PREFIX}${portionId}`);
  } catch {
    // ignore
  }
}

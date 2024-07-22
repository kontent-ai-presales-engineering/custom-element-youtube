import { useState } from 'react';
import { useIsDisabled, useValue } from './customElement/CustomElementContext';
import getVideoId from 'get-video-id';
import LiteYouTubeEmbed from 'react-lite-youtube-embed';
import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css';

export const IntegrationApp = () => {
  const [elementValue, setElementValue] = useValue();
  const isDisabled = useIsDisabled();
  const [videoIdInput, setVideoIdInput] = useState<string | null>(elementValue?.videoId ?? null);

  const onVideoIdChange = () => {
    if (!videoIdInput) {
      return;
    }
    const videoId = getVideoId(videoIdInput);
    if (!videoId.id || !videoId.service) {
      return setElementValue({ videoId: videoIdInput });
    }
    if (videoId.service !== "youtube") {
      alert("Only YouTube videos are supported");
      return;
    }
    setElementValue({ videoId: videoId.id });
  };

  const onRemoveVideoId = () => setElementValue(null);

  return (
    <div>
      <input
        type="text"
        value={videoIdInput ?? ""}
        onChange={(e) => setVideoIdInput(e.target.value)}
        disabled={isDisabled}
      />
      <button onClick={onVideoIdChange} disabled={isDisabled}>Change video id</button>
      <button onClick={onRemoveVideoId} disabled={isDisabled}>Remove video id</button>
      {elementValue?.videoId
        ? (
          <LiteYouTubeEmbed
            id={elementValue.videoId}
            title="YouTube video"
          />)
        : (
          <p>No video id set</p>
        )}
    </div>
  );
};

IntegrationApp.displayName = 'IntegrationApp';

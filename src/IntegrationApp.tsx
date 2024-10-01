import { useState } from 'react';
import { useIsDisabled, useValue } from './customElement/CustomElementContext';
import getVideoId from 'get-video-id';
import LiteYouTubeEmbed from 'react-lite-youtube-embed';
import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css';
import { app, appInputs } from "./integrationApp.module.css";

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
    <main className={app}>
      <section className={appInputs}>
        <input
          type="text"
          className={`input ${isDisabled ? "disabled" : ""}`}
          value={videoIdInput ?? ""}
          onChange={(e) => setVideoIdInput(e.target.value)}
          disabled={isDisabled}
        />
        <button className="button primary" onClick={onVideoIdChange} disabled={isDisabled}>Change video id</button>
        <button className="button destructive" onClick={onRemoveVideoId} disabled={isDisabled}>Remove video id</button>
      </section>
      <section className="section">
        {elementValue?.videoId
          ? (
            <LiteYouTubeEmbed
              id={elementValue.videoId}
              title="YouTube video"
            />)
          : (
            <p>No video id set</p>
          )}
      </section>
    </main>
  );
};

IntegrationApp.displayName = 'IntegrationApp';

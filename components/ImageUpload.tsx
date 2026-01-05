import { useState } from 'react';
import Image from 'next/image';

export default function ImageUpload() {
  const [imageUrl, setImageUrl] = useState('');

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);

    const res = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    const data = await res.json();
    setImageUrl(data.url);
  };

  return (
    <div>
      <input type="file" onChange={handleUpload} />
      {imageUrl && (
        <Image
          src={imageUrl}
          alt="Uploaded"
          width={200}
          height={200}
          style={{ objectFit: 'cover' }}
        />
      )}
    </div>
  );
}

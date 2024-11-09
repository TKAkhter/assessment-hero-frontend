import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import axiosInstance from '../common/axios';

const FileView: React.FC = () => {
    const { imageName } = useParams<{ imageName: string }>();
    const [imageDetails, setImageDetails] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchImageDetails = async () => {
            try {
                const response = await axiosInstance.get(`/files/${imageName}`);
                setImageDetails(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching image details:', error);
                setLoading(false);
            }
        };

        if (imageName) {
            fetchImageDetails();
        }
    }, [imageName]);

    if (loading) {
        return <div className="text-center p-4">Loading image details...</div>;
    }

    const handleShare = async (e: any) => {
        try {
            const response = await axiosInstance.post(`/files/share/${e.target.value}`);
            const shareableLink = response.data.shareableLink;
            await navigator.clipboard.writeText(shareableLink);
            toast.success('Link copied to clipboard!');
        } catch (error) {
            console.error("Error generating share link:", error);
        }
    };

    return (
        <div className="flex flex-col items-center p-4">
            {imageDetails ? (
                <>
                    <div className="hero bg-base-200 min-h-screen">
                        <div className="hero-content flex-col lg:flex-row">
                            <img
                                src={`${process.env.REACT_APP_API_URL}/uploads/${imageDetails.fileName}`}
                                className="max-w-sm rounded-lg shadow-2xl" />
                            <div>
                                <h1 className="text-xl">Name: <b>{imageDetails.name}</b></h1>
                                <h2 className="text-xl py-6">Tags:</h2>
                                {imageDetails.tags.map((tag: string, index: number) => (
                                    <span className="badge badge-neutral mx-2 px-5 py-4">{tag}</span>
                                ))}
                                <div>
                                    <button className="btn btn-accent">{imageDetails.views ?? 0} view{imageDetails.views ? 's' : null}</button>
                                    <button className="btn btn-ghost my-4" value={imageDetails.name} onClick={handleShare}>Share</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <p>No details available for this image.</p>
            )}
        </div>
    );
};

export default FileView;
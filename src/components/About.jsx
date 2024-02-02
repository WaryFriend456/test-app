import { Avatar, Typography } from "@material-tailwind/react";

export function About() {
    return (
        <div className="flex flex-col items-center gap-40 mt-40">
            <div className="flex justify-center gap-40">
                <div className="flex flex-col items-center gap-4">
                    <Avatar src="https://docs.material-tailwind.com/img/face-2.jpg" alt="avatar" />
                    <Typography variant="h6">Tania Andrew</Typography>
                    <Typography variant="small" color="gray" className="font-normal">
                        Web Developer
                    </Typography>
                </div>
                <div className="flex flex-col items-center gap-4">
                    <Avatar src="https://docs.material-tailwind.com/img/face-2.jpg" alt="avatar" variant="rounded" />
                    <Typography variant="h6">John Doe</Typography>
                    <Typography variant="small" color="gray" className="font-normal">
                        Backend Developer
                    </Typography>
                </div>
                <div className="flex flex-col items-center gap-4">
                    <Avatar src="https://docs.material-tailwind.com/img/face-2.jpg" alt="avatar" variant="square" />
                    <Typography variant="h6">Jane Smith</Typography>
                    <Typography variant="small" color="gray" className="font-normal">
                        UI/UX Designer
                    </Typography>
                </div>
            </div>
            <div className="flex justify-center gap-40">
                <div className="flex flex-col items-center gap-4">
                    <Avatar src="https://docs.material-tailwind.com/img/face-2.jpg" alt="avatar" variant="square" />
                    <Typography variant="h6">Emma Watson</Typography>
                    <Typography variant="small" color="gray" className="font-normal">
                        Project Manager
                    </Typography>
                </div>
                <div className="flex flex-col items-center gap-4">
                    <Avatar src="https://docs.material-tailwind.com/img/face-2.jpg" alt="avatar" variant="square" />
                    <Typography variant="h6">Robert Downey Jr.</Typography>
                    <Typography variant="small" color="gray" className="font-normal">
                        Data Analyst
                    </Typography>
                </div>
                <div className="flex flex-col items-center gap-4">
                    <Avatar src="https://docs.material-tailwind.com/img/face-2.jpg" alt="avatar" variant="square" />
                    <Typography variant="h6">New Person</Typography>
                    <Typography variant="small" color="gray" className="font-normal">
                        New Role
                    </Typography>
                </div>
            </div>
        </div>
    );
}
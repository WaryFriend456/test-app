import {
    Typography,
    Card,
} from "@material-tailwind/react";

export default function Home() {
    return (
        <div className="mx-auto py-12 w-full">
            <Card className="mb-12 overflow-hidden">
                <img
                    alt="nature"
                    className="h-[32rem] w-full object-cover object-center"
                    src="https://images.unsplash.com/photo-1485470733090-0aae1788d5af?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2717&q=80"
                />
            </Card>
            <Typography variant="h2" color="blue-gray" className="mb-2">
                Welcome To VocalWheels
            </Typography>
            <Typography variant="h5" color="gray" className="font-normal">
                Control the car using your voice
            </Typography>
        </div>
    );
}
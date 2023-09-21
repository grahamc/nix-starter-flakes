const extractTagFromRef = (ref: string): string | undefined => {
    if (ref.startsWith("refs/tags/")) {
        const parts = ref.split("/");
        if (parts.length != 3) {
            console.log(`Tried to extract a tag from '${ref}' but it didn't split by '/' into three parts.`);
            return undefined;
        }

        return parts[2];
    } else {
        console.log(`Tried to extract a tag from '${ref}' but it didn't start with 'refs/tags/'`);
        return undefined;
    }
} 

interface VersionDirectory {
    directory: string;
    version: string;
}

const extractVersionDirectory = (tag?: string, ref: string): VersionDirectory | undefined => {
    const selected_tag: string | undefined = input_tag || extractTagFromRef(ref);

    if (!selected_tag) {
        console.log(`No valid tag identified from the ref ('${ref}') or inputs ('${input_tag}').`);
        return undefined;
    }

    const parts = selected_tag.split('-');
    if (parts.length != 2) {
        console.log(`The tag '${selected_tag}' didn't split by '-' into two parts, where the first part should be the directory and the second should be the version.`);
        return undefined;
    }

    return {
        directory: parts[0],
        version: parts[1],
    };
};

const input_tag: string | undefined = "go-v0.1.0";
const ref: string = "refs/tags/go-v0.1.1695299916";

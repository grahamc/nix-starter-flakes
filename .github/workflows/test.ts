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
    full_ref: string;
}

const extractVersionDirectory = (ref: string, tag?: string): VersionDirectory | undefined => {
    const selected_tag: string | undefined = tag || extractTagFromRef(ref);

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
        full_ref: `refs/tags/${parts[0]}-${parts[1]}`,
    };
};

const input_tag: string | undefined = "go-v0.1.0";
const ref: string = "refs/tags/go-v0.1.1695299916";

const result = extractVersionDirectory(ref, input_tag);
if (result) {
    core.setOutput("directory", result.directory);
    core.setOutput("version", result.version);
    core.setOutput("full_ref", result.full_ref);
} else
    process.exit(1);
}



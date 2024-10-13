import { Form, FormSection } from "components/ResumeForm/Form";
import {
  Input,
  BulletListTextarea,
} from "components/ResumeForm/Form/InputGroup";
import type { CreateHandleChangeArgsWithDescriptions } from "components/ResumeForm/types";
import { useAppDispatch, useAppSelector } from "lib/redux/hooks";
import {
  changeCertification,
  selectCertification,
} from "lib/redux/resumeSlice";
import type { ResumeCertification } from "lib/redux/types";

export const CertificationForm = () => {
  const certification = useAppSelector(selectCertification);
  const dispatch = useAppDispatch();

  const showDelete = certification.length > 1;

  return (
    <Form form="certification" addButtonText="Add Certificate">
      {certification.map(({ certTitle, date }, idx) => {
        const handleCertificationChange = (
          ...[
            field,
            value,
          ]: CreateHandleChangeArgsWithDescriptions<ResumeCertification>
        ) => {
          // TS doesn't support passing union type to single call signature
          // https://github.com/microsoft/TypeScript/issues/54027
          // any is used here as a workaround
          dispatch(changeCertification({ idx, field, value } as any));
        };
        const showMoveUp = idx !== 0;
        const showMoveDown = idx !== certification.length - 1;

        return (
          <FormSection
            key={idx}
            form="certification"
            idx={idx}
            showMoveUp={showMoveUp}
            showMoveDown={showMoveDown}
            showDelete={showDelete}
            deleteButtonTooltipText="Delete Certificate"
          >
            <Input
              label="Certification Title"
              labelClassName="col-span-4"
              name="certTitle"
              placeholder="AWS Cloud"
              value={certTitle}
              onChange={handleCertificationChange}
            />
            <Input
              label="Date"
              labelClassName="col-span-2"
              name="date"
              placeholder="Jun 2022 - Present"
              value={date}
              onChange={handleCertificationChange}
            />
          </FormSection>
        );
      })}
    </Form>
  );
};
